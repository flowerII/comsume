package cn.qianshu.comsume.controller;


import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.qianshu.comsume.entity.User;

@Controller
public class MainController {
	
	private static Logger logger = LoggerFactory.getLogger(MainController.class);

    @RequestMapping("/")
    public String root() {
        return "redirect:/index";
    }

    @RequestMapping("/index")
    public String index(Principal user,Authentication authentication,ModelMap model) {
    	
    	logger.info("principle user:" + user.getName());
    	User userDetails = (User)authentication.getPrincipal();

    	logger.info("principle get user:" + userDetails.getUsername()+":authorities size:"+userDetails.getAuthorities().size());
    	model.addAttribute("username", user.getName());
        return "vue/admin";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/login-error")
    public String loginError(Model model) {
        model.addAttribute( "loginError"  , true);
        return "login";
    }

    @GetMapping("/401")
    public String accessDenied() {
        return "401";
    }

    @GetMapping("/user/common")
    public String common() {
        return "user/common";
    }

    @GetMapping("/user/admin")
    public String admin() {
        return "user/admin";
    }


}
