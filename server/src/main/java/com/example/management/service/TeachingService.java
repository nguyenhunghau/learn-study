/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.management.service;

import com.example.management.entity.TeachingClassEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */
@Service
public interface TeachingService {
    
    public TeachingClassEntity addClass(TeachingClassEntity entity);
}
