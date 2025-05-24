//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.controller;

import com.example.demo.model.Address;
import com.example.demo.service.AddressService;
import com.example.demo.util.JwtUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/address"})
@CrossOrigin(
    origins = {"http://localhost:5173"}
)
public class AddressController {
    @Autowired
    private AddressService addressService;
    @Autowired
    private JwtUtil jwtUtil;

    public AddressController() {
    }

    @PostMapping({"/save"})
    public ResponseEntity<Address> saveAddress(@RequestHeader("Authorization") String token, @RequestBody Address address) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            if (!this.jwtUtil.validateToken(jwtToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            } else {
                String email = this.jwtUtil.extractAllClaims(jwtToken).getSubject();
                Address savedAddress = this.addressService.saveAddress(email, address);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedAddress);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping({"/list"})
    public ResponseEntity<List<Address>> getUserAddresses(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            if (!this.jwtUtil.validateToken(jwtToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            } else {
                String email = this.jwtUtil.extractAllClaims(jwtToken).getSubject();
                List<Address> addresses = this.addressService.getAddressesByEmail(email);
                return ResponseEntity.ok(addresses);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
