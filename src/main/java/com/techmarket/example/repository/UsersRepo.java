package com.techmarket.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techmarket.example.entity.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users, String> {

}
