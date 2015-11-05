package com.spartans.projectteam7.Controllers;

import com.spartans.projectteam7.Model.People;

/**
 * Created by karanbir on 04/11/15.
 */
public class UserManager {

    private  People people;


    // Constructor
    public UserManager(People people){
        this.people = people;
    }

    // Method used to authenticate users
    public boolean authenticate(){
        return  false;

    }

    // Method used to register Users
    public boolean register(){
        return false;
    }

    // Method used to edit the info of people
    public boolean edit(){
        return false;
    }

    // Method used by adminstartor to manage user
    public void manageUsers(){

    }

    // Method used to insert in MySql database
    public boolean insert(){
        return false;
    }

    //Method used to update in MySql Database
    public boolean update(){
        return false;
    }

    //Method used to delete in MySql Database
    public boolean delete(){
        return false;
    }

    // Method used to query in MySql Database
    public boolean query(){
        return false;
    }
}
