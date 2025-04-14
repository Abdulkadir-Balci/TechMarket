package com.techmarket.ecommerce.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techmarket.ecommerce.entity.Users;
import com.techmarket.ecommerce.repository.UsersRepo;
import com.techmarket.ecommerce.requests.LoginRequest;

@Service
public class UserService {

	@Autowired
	UsersRepo usersRepo;

	public Users addUser(Users user) {
		user.setRole("user"); 
		user.setJoinDate(LocalDateTime.now());
		return usersRepo.save(user);
	}

	public Users LoginUser(LoginRequest loginRequest) {
	    Optional<Users> user = usersRepo.findById(loginRequest.getUserEmail());
	    if (!user.isPresent()) {
	        return null; 
	    }
	    Users user1 = user.get();
	    if (!user1.getPassword().equals(loginRequest.getPassword())) {
	        return null; 
	    }
	    return user1; 
	}
	
	public Users getUserByEmail(String email) {
	    return usersRepo.findById(email).orElse(null);
	}
}
