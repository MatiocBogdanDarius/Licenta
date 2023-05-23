package backend.user.account.service.config.security.filter;

import backend.user.account.service.service.JwtService;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
       var authorizationHeader = request.getHeader("Authorization");

       var isValidAuthorizationHeader =
               checkAuthorizationHeaderValidity(authorizationHeader);

       if(!isValidAuthorizationHeader){
           filterChain.doFilter(request, response);
           return;
       }

       var jwt = authorizationHeader.substring(7);

       var userEmail = jwtService.extractUsername(jwt);

       var authentication = SecurityContextHolder
               .getContext()
               .getAuthentication();

       if (userEmail != null && authentication == null) {
           UserDetails userDetails = userDetailsService
                   .loadUserByUsername(userEmail);

           if(jwtService.isTokenValid(jwt, userDetails)){
               updateSecurityContext(request, userDetails);
           }
       }

       filterChain.doFilter(request, response);
    }

    private void updateSecurityContext(
            @NonNull HttpServletRequest request,
            @NonNull UserDetails userDetails
    ){
        var authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

        var webAuthenticationDetails = new WebAuthenticationDetailsSource()
                .buildDetails(request) ;

        authToken.setDetails(webAuthenticationDetails);

        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    private boolean checkAuthorizationHeaderValidity(String authorizationHeader){
        return authorizationHeader != null
                && authorizationHeader.startsWith("Bearer ");
    }
}
