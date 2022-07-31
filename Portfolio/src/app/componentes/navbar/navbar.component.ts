import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged=false;

  constructor(private tokenS:TokenService, private router:Router) { }

  ngOnInit(): void {
    if(this.tokenS.getToken()) {
      this.isLogged=true
    }else{
      this.isLogged=false;
    }
  }
  
  onLogin(){
    this.router.navigate(['/login']);  
  }

  onLogout(){
    this.tokenS.logOut();
    window.location.reload();
  }

}
