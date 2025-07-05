package br.com.printers.back.controller;

import br.com.printers.back.config.JwtUtil;
import br.com.printers.back.entity.User;
import br.com.printers.back.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        return userRepository.findByUsername(loginData.getUsername())
                .filter(user -> user.getPassword().equals(loginData.getPassword()))
                .map(user -> {
                    String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
                    return ResponseEntity.ok().body("{\"token\": \"" + token + "\"}");
                })
                .orElse(ResponseEntity.status(401).body("{\"error\": \"Credenciais inválidas\"}"));
    }
}
