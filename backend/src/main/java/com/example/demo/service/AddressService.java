//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.demo.service;

import com.example.demo.model.Address;
import com.example.demo.repository.AddressRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public AddressService() {
    }

    public Address saveAddress(String email, Address address) {
        address.setEmail(email);
        return (Address)this.addressRepository.save(address);
    }

    public List<Address> getAddressesByEmail(String email) {
        return this.addressRepository.findByEmail(email);
    }
}
