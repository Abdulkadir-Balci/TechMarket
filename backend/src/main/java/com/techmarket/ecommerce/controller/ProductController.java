package com.techmarket.ecommerce.controller;

import com.techmarket.ecommerce.entity.Product;
import com.techmarket.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Tüm kategorilerden ürünleri çek
    @PostMapping("/fetch")
    public String fetchAllProducts() {
        productService.fetchAndSaveProducts(); // Tüm kategoriler burada çekilecek
        return "Tüm ürünler başarıyla çekildi ve kaydedildi.";
    }

    // Belirli bir kategoriden ürünleri çek (örn: /api/products/fetch/phones)
    @PostMapping("/fetch/{category}")
    public String fetchProductsByCategory(@PathVariable String category) {
        productService.fetchAndSaveByCategory(category);
        return category + " kategorisinden ürünler başarıyla çekildi ve kaydedildi.";
    }

    // Veritabanındaki tüm ürünleri getir
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
}
