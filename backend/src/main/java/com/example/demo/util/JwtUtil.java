//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private final Key key;
    private final long expiration;

    public JwtUtil() {
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        this.expiration = 86400000L;
    }

    public String generateToken(String email, String userType) {
        return Jwts.builder().setSubject(email).claim("user_type", userType).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + 86400000L)).signWith(this.key).compact();
    }

    public Claims extractAllClaims(String token) {
        return (Claims)Jwts.parserBuilder().setSigningKey(this.key).build().parseClaimsJws(token).getBody();
    }

    public String extractEmail(String token) {
        return ((Claims)Jwts.parserBuilder().setSigningKey(this.key).build().parseClaimsJws(token).getBody()).getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(this.key).build().parseClaimsJws(token);
            return true;
        } catch (IllegalArgumentException | JwtException var3) {
            return false;
        }
    }
}
