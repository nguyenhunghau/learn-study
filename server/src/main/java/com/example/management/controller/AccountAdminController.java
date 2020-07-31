package com.example.management.controller;

import com.example.management.dto.AccountDTO;
import com.example.management.entity.AccountEntity;
import com.example.management.service.AccountService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 *
 * @author Nguyen Hung Hau
 */
@Controller
@RequestMapping("/account-admin")
public class AccountAdminController {
    
    @Autowired
    private AccountService accountService;
    
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model) {
        model.addAttribute("message", "hello");
        return "login";
    }
    
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ModelAndView list(Model model) {
//        model.addAttribute("accountList", accountService.findAllAccount());
        return new ModelAndView("account/dashboard", "accountList", accountService.findAllAccount());
    }
    
    @GetMapping("/getAccount/{id}")
    public String getAccount(Model model, @PathVariable("id") int id) {
        model.addAttribute("account", accountService.findById(id));
        return "account/modify";
    }
    
    @PostMapping("/updateAccount/{id}")
    public String updateAccount(@Valid @ModelAttribute("accountDTO") AccountDTO accountDTO, @PathVariable("id") int id, BindingResult result, RedirectAttributes atts, Model model) {
        accountDTO.setId(id);
        if(result.hasErrors()) {
            atts.addAttribute("message", "Filter all info");
            return "account/modify";
        }
        accountService.update(accountDTO);
        model.addAttribute("accountList", accountService.findAllAccount());
        return "redirect:/account-admin/list";
    }
    
    @PostMapping("/addAccount")
    public String addAccount(@Valid @ModelAttribute("account") AccountDTO account, BindingResult result, RedirectAttributes atts, Model model) {
        if(result.hasErrors()) {
            atts.addAttribute("message", "Filter all info");
            return "account/modify";
        }
        accountService.update(account);
        model.addAttribute("accountList", accountService.findAllAccount());
        return "redirect:/account-admin/list";
    }
    
    @PostMapping("/delete")
    public String delete(@RequestParam("id") int accountId) {
        accountService.delete(accountId);
        return "redirect:/account-admin/list";
    }
}
