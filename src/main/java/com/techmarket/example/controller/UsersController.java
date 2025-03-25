package com.techmarket.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.techmarket.example.entity.Users;
import com.techmarket.example.requests.LoginRequest;
import com.techmarket.example.service.UserService;

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

}
