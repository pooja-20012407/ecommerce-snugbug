//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import com.example.demo.util.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/products"})
@CrossOrigin(
    origins = {"http://localhost:5173"}
)
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private JwtUtil jwtUtil;

    public ProductController() {
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok(this.productService.getAllProducts());
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody Product product, HttpServletRequest request) {
        String token = this.extractTokenFromHeader(request);
        if (token != null && this.jwtUtil.validateToken(token)) {
            Claims claims = this.jwtUtil.extractAllClaims(token);
            String userType = (String)claims.get("user_type");
            if (!"seller".equalsIgnoreCase(userType)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only sellers can add products");
            } else {
                Product savedProduct = this.productService.saveProduct(product);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product, HttpServletRequest request) {
        String token = this.extractTokenFromHeader(request);
        if (token != null && this.jwtUtil.validateToken(token)) {
            Claims claims = this.jwtUtil.extractAllClaims(token);
            String userType = (String)claims.get("user_type");
            if (!"seller".equalsIgnoreCase(userType)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only sellers can update products");
            } else {
                Product existingProduct = this.productService.getProductById(id);
                if (existingProduct == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
                } else {
                    existingProduct.setName(product.getName());
                    existingProduct.setPrice(product.getPrice());
                    existingProduct.setImage(product.getImage());
                    Product updatedProduct = this.productService.saveProduct(existingProduct);
                    return ResponseEntity.ok(updatedProduct);
                }
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        try {
            this.productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (Exception var3) {
            return ResponseEntity.notFound().build();
        }
    }

    private String extractTokenFromHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        return header != null && header.startsWith("Bearer ") ? header.substring(7) : null;
    }
}
