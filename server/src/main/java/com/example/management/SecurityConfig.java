package com.example.management;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.security.JwtAuthenticationEntryPoint;
import com.example.management.security.JwtTokenFilter;
import java.util.LinkedList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
 * @email nguyenhunghau@fabercompany.co.jp
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtTokenFilter jwtRequestFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        // configure AuthenticationManager so that it knows from where to load
        // user for matching credentials
        // Use BCryptPasswordEncoder
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    private static final RequestMatcher SECURITY_EXCLUSION_MATCHER;

    static {
        String[] urls = new String[]{
            "/account/login",
            "/refreshToken",
            "/health",
            "/ping"
        };

        //Build Matcher List
        LinkedList<RequestMatcher> matcherList = new LinkedList<>();
        for (String url : urls) {
            matcherList.add(new AntPathRequestMatcher(url));
        }

        //Link Matchers in "OR" config.
        SECURITY_EXCLUSION_MATCHER = new OrRequestMatcher(matcherList);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // We don't need CSRF for this example
        httpSecurity.csrf().disable().cors().and()
                // dont authenticate this particular request
                .authorizeRequests().antMatchers("/account/login", "/account/register", 
                        "/image/data", "/teaching/getAll", "/subject/**", "/unit/**", "/level/**", "/account/getAccount").permitAll()
                .antMatchers("/teaching/**").authenticated()
                // all other requests need to be authenticated
                .anyRequest().authenticated().and().
                // make sure we use stateless session; session won't be used to
                // store user's state.
                exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add a filter to validate the tokens with every request
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
//        web.ignoring().requestMatchers(SECURITY_EXCLUSION_MATCHER);
        web.ignoring()
                .antMatchers("/account/login")
                .antMatchers("/account/register")
                .antMatchers("/image/**");
    }

}
