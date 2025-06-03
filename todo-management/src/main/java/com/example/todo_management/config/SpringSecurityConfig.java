package com.example.todo_management.config;

import com.example.todo_management.security.JwtAuthenticationEntryPoint;
import com.example.todo_management.security.JwtAuthenticationFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SpringSecurityConfig {

    private UserDetailsService userDetailsService;

    private JwtAuthenticationEntryPoint authenticationEntryPoint;
    private JwtAuthenticationFilter authenticationFilter;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf((csrf) -> csrf.disable())
                .authorizeHttpRequests((authorize) -> {
                    //This is Role based authorization.
//                    authorizeRequests.requestMatchers(HttpMethod.POST,"/api/**").hasRole("ADMIN");
//                    authorizeRequests.requestMatchers(HttpMethod.PUT,"/api/**").hasRole("ADMIN");
//                    authorizeRequests.requestMatchers(HttpMethod.DELETE,"/api/**").hasRole("ADMIN");
//                    authorizeRequests.requestMatchers(HttpMethod.GET,"/api/**").hasAnyRole("ADMIN","USER");
//                    authorizeRequests.requestMatchers(HttpMethod.PATCH,"/api/**").hasAnyRole("ADMIN","USER");
                    //In scenario where we need to allow GET to have public access. i.e. without any credential
                    //authorizeRequests.requestMatchers(HttpMethod.GET,"/api/**").permitAll();
                    authorize.requestMatchers("/api/auth/**").permitAll();
                    //ALLOWING PREFLIGHT REQUEST
                    authorize.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll();
                    authorize.anyRequest().authenticated();})
                .httpBasic(Customizer.withDefaults());

        http.exceptionHandling( exception -> exception
                .authenticationEntryPoint(authenticationEntryPoint));

        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    //IN-MEMORY AUTHENTICATION
//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetails drishti = User.builder()
//                .username("drishti")
//                .password(passwordEncoder().encode("password"))
//                .roles("USER")
//                .build();
//
//        UserDetails admin = User.builder()
//                .username("admin")
//                .password(passwordEncoder().encode("admin"))
//                .roles("ADMIN")
//                .build();
//
//        return new InMemoryUserDetailsManager(drishti, admin);
//    }
}

