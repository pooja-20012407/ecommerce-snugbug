//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public ProductService() {
    }

    public List<Product> getAllProducts() {
        return this.productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return (Product)this.productRepository.save(product);
    }

    public Product getProductById(Long id) {
        Optional<Product> optionalProduct = this.productRepository.findById(id);
        return optionalProduct.orElse(null);
    }


    public void deleteProduct(Long id) {
        this.productRepository.deleteById(id);
    }
}
