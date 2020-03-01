package com.fscc.app.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * This custom filter manually adds the"Access-Control-Allow-Origin" header which allows Cross Site calls for local testing.<BR>
 * <code>
 * @Bean
 * FilterRegistrationBean corsFilter() {
 *      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
 *      CorsConfiguration config = new CorsConfiguration();
 *      config.setAllowCredentials(true);
 *      config.addAllowedOrigin("*");
 *      config.addAllowedHeader("*");
 *      config.addAllowedMethod("*");
 *      source.registerCorsConfiguration("/**", config);
 *
 *      FilterRegistrationBean registration = new FilterRegistrationBean(new CorsFilter(source));
 *
 *      log.debug( "Registered CORS Filter");
 *      return registration;
 * }
 * 
 * @author Ison Udoka
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class FSCCCorsFilter implements Filter {

	/** Development Region Constant for Reusability Purposes */
	protected static final String REGION_DVL = "local";

	/** Options Method Constant for Reusability Purposes */
	protected static final String METHOD_OPTIONS = "OPTIONS";

	private static Logger log = LoggerFactory.getLogger(FSCCCorsFilter.class);

    //@Value("${server.servlet.session.timeout}")
    //private Long sessionTimeout;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("Initializing FSCCCorsFilter");
    }

    @Override
    public void destroy() {
        log.info("Destroying FSCCCorsFilter");
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp,
      FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;

        // Cache-Control needs to be set to no-cache to force IE to retrieve
        // latest info from Redux Store instead of caching it
        response.addHeader("Cache-Control", "no-cache");

        response.addHeader("Access-Control-Allow-Methods",
                "DELETE, GET, HEAD, OPTIONS, POST, PUT");
        //response.addHeader("Access-Control-Max-Age", sessionTimeout + "");
        response.setHeader("Access-Control-Allow-Headers",
        	"Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization, content-type, xsrf-token, Cache-Control, WWW-Authenticate");
        response.addHeader("Access-Control-Expose-Headers",
        	"Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization, content-type, xsrf-token, Cache-Control, WWW-Authenticate,");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Origin", "*");

        if (METHOD_OPTIONS.equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else { 
            chain.doFilter(request, response);
        }
    }
}