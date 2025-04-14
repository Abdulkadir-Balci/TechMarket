package com.techmarket.ecommerce.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.techmarket.ecommerce.entity.Users;
import com.techmarket.ecommerce.requests.LoginRequest;
import com.techmarket.ecommerce.service.UserService;

@RestController
public class UsersController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/addUser")
	@CrossOrigin(origins = "http://localhost:3000")
	public Users addUser(@RequestBody Users user) {
		return userService.addUser(user);
	}
	
	@PostMapping("/loginUser")
	@CrossOrigin(origins = "http://localhost:3000")
	public Users loginuser(@RequestBody LoginRequest loginRequest) {
	    return userService.LoginUser(loginRequest);
	}
	
	@PostMapping("/getUserByEmail")
	@CrossOrigin(origins = "http://localhost:3000")
	public Users getUserByEmail(@RequestBody Map<String, String> request) {
	    String email = request.get("email");
	    return userService.getUserByEmail(email);
	}

}
