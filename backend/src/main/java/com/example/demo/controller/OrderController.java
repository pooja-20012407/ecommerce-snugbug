//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.controller;

import com.example.demo.model.Orders;
import com.example.demo.repository.OrderRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/orders"})
@CrossOrigin(
    origins = {"http://localhost:5173"}
)
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    public OrderController() {
    }

    @PostMapping
    public ResponseEntity<String> placeOrder(@RequestBody Orders order) {
        order.setOrderDate(LocalDateTime.now());
        this.orderRepository.save(order);
        return ResponseEntity.ok("Order saved successfully");
    }

    @GetMapping
    public ResponseEntity<List<Orders>> getOrdersByEmail(@RequestParam String email) {
        List<Orders> orders = this.orderRepository.findByEmail(email);
        return ResponseEntity.ok(orders);
    }
}
