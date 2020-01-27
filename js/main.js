//FROM OC PROJECT 6 SPECIFICATION:
//as soon as players become adjacent they can fight
//the default weapon inflicts 10 points in any one use
//the other weapons have different damage capacity
//each player attacks in turn - so once one player attacks/defends control of those attack/defend options go to the other player
//if a player chooses to defend rather than attack they sustain 50% less damage
//once a player hits 0 life points the other player is the winner


class Player {

   constructor(url, width, height, x, y){
 
         this.url = url;
         this.width = width;
         this.height = height;
         this.x = x;
         this.y = y;
         this.lifePoints = 100;
         this.moveCount = 3;
         this.weaponSwapped = "none";
         this.weaponCheck = false;
         this.baseWeapon = true;
         this.gunRetrieved = false;
         this.bowRetrieved = false;
         this.tridentRetrieved = false;
         this.myDefaultRetrieved = false;
         this.yrDefaultRetrieved = false;
         this.readyToFight = false;
    }


   redrawEmptyCell(ctx, player, im) {
   
            ctx.drawImage(im, player.x, player.y, gameBoard.width, gameBoard.height);
 
    }
 
   redrawPlayer(ctx, player, im) {
               
           ctx.drawImage(im, player.x, player.y, gameBoard.width, gameBoard.height);

    }
 
   redrawWeapon(ctx, lastPlayerPositionX, lastPlayerPositionY, im) {

        ctx.drawImage(im, lastPlayerPositionX, lastPlayerPositionY, this.width, this.height);

    }

   checkForLeftObstacle(player, obstacleObjs) {

        for(let i = 0; i < obstacleObjs.length; i++){
             if(obstacleObjs[i].y == player.y && obstacleObjs[i].x == player.x - 99){
                         return true;
             }
       }
   }
 
   checkForRightObstacle(player, obstacleObjs) {

        for(let i = 0; i < obstacleObjs.length; i++){
            if(obstacleObjs[i].y == player.y && obstacleObjs[i].x == player.x + 99){
                     return true;
            }
       }
    }
                       
   checkForTopObstacle(player, obstacleObjs) {

        for(let i = 0; i < obstacleObjs.length; i++){
             if(obstacleObjs[i].x == player.x && obstacleObjs[i].y == player.y - 72){
                     return true;
             }
        }
    }

   checkForBelowObstacle(player, obstacleObjs) {

        for(let i = 0; i < obstacleObjs.length; i++){
            if(obstacleObjs[i].x == player.x && obstacleObjs[i].y == player.y + 72){
                   return true;
            }
       }
    }
 
   checkForBelowWeapon(player, wG, wB, wT, wD1, wD2) {

       if(wG.x == player.x && wG.y == player.y + 72){
                  return true;
      }else if(wB.x == player.x && wB.y == player.y + 72){
                  return true;
      }else if(wT.x == player.x && wT.y == player.y + 72){
                  return true;
      }else if(wD1.x == player.x && wD1.y == player.y + 72){
                  return true;
      }else if(wD2.x == player.x && wD2.y == player.y + 72){
                  return true;
      }
   }
 
   checkForTopWeapon(player, wG, wB, wT, wD1, wD2) {

      if(wG.x == player.x && wG.y == player.y - 72){
                 return true;
      }else if(wB.x == player.x && wB.y == player.y - 72){
                 return true;
      }else if(wT.x == player.x && wT.y == player.y - 72){
                 return true;
      }else if(wD1.x == player.x && wD1.y == player.y - 72){
                 return true;
      }else if(wD2.x == player.x && wD2.y == player.y - 72){
                 return true;
      }
   }

   checkForLeftWeapon(player, wG, wB, wT, wD1, wD2) {

      if(wG.y == player.y && wG.x == player.x - 99){
               return true;
      }else if(wB.y == player.y && wB.x == player.x - 99){
               return true;
      }else if(wT.y == player.y && wT.x == player.x - 99){
               return true;
      }else if(wD1.y == player.y && wD1.x == player.x - 99){
               return true;
      }else if(wD2.y == player.y && wD2.x == player.x - 99){
               return true;
      }
   }
 
   checkForRightWeapon(player, wG, wB, wT, wD1, wD2) {

      if(wG.y == player.y && wG.x == player.x + 99){
               return true;
     }else if(wB.y == player.y && wB.x == player.x + 99){
               return true;
     }else if(wT.y == player.y && wT.x == player.x + 99){
               return true;
     }else if(wD1.y == player.y && wD1.x == player.x + 99){
              return true;
     }else if(wD2.y == player.y && wD2.x == player.x + 99){
              return true;
     }
   }


   checkForPlayerLeft(p1Cell, p2Cell){

      if(p1Cell.x == p2Cell.x - 99 && p1Cell.y == p2Cell.y){
               return true;
      }else if(p2Cell.x == p1Cell.x - 99 && p1Cell.y == p2Cell.y){
               return true;
      }
   }

   checkForPlayerRight(p1Cell, p2Cell){

      if(p1Cell.x == p2Cell.x + 99 && p1Cell.y == p2Cell.y){
                      return true;
      }else if(p2Cell.x == p1Cell.x + 99 && p1Cell.y == p2Cell.y){
                     return true;
      }
   }

   checkForPlayerAbove(p1Cell, p2Cell){

      if(p1Cell.x == p2Cell.x && p1Cell.y == p2Cell.y - 72){
                      return true;
      }else if(p2Cell.x == p1Cell.x && p2Cell.y == p1Cell.y - 72){
                     return true;
      }
   }

   checkForPlayerBelow(p1Cell, p2Cell){

      if(p1Cell.x == p2Cell.x && p1Cell.y == p2Cell.y + 72){
                     return true;
      }else if(p2Cell.x == p1Cell.x && p2Cell.y == p1Cell.y + 72){
                     return true;
      }
   }


   moveLeft(ct,player,opponent, obst, myDefault, yrDefault, wGun, wBow, wTrident, currentPlayerIm, emptyIm, baseWeaponIm, gunImg, bowImg, tridentImg){

        let obstacleCheck = obst;
 
        if(this.readyToFight){
                    this.redrawPlayer(ct, player, currentPlayerIm);
        }else if(this.moveCount == 0){
                    this.redrawPlayer(ct, player, currentPlayerIm);
                    this.moveCount--;
        }else if(this.moveCount < 0){
                    return true;
        }else if(this.checkForLeftObstacle(player, obstacleCheck)  || player.x == 1){
                    this.redrawPlayer(ct, player, currentPlayerIm);                          
        }else if(this.checkForLeftWeapon(player, wGun, wBow, wTrident, myDefault, yrDefault)  || player.x == 1){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  player.x -= 99;
                  if(wGun.x == player.x && wGun.y == player.y){
                        this.redrawEmptyCell(ct, player, emptyIm);
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.baseWeapon){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.myDefaultRetrieved){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.bowRetrieved){
                              wBow.x = player.x;
                              wBow.y = player.y;
                           }else if(this.tridentRetrieved){
                              wTrident.x = player.x;
                              wTrident.y = player.y;
                           }else if(this.yrDefaultRetrieved){
                              yrDefault.x = player.x;
                              yrDefault.y = player.y;
                           }
                        this.weaponCheck = true;
                        this.gunRetrieved = true;
                        this.moveCount--;
                        if(this.checkForPlayerLeft(player, opponent)){
                           this.readyToFight = true;
                              return false;
                        }
                  }else if(wBow.x == player.x && wBow.y == player.y){
                        this.redrawEmptyCell(ct, player, emptyIm);
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.baseWeapon){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.myDefaultRetrieved){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.gunRetrieved){
                              wGun.x = player.x;
                              wGun.y = player.y;
                           }else if(this.tridentRetrieved){
                              wTrident.x = player.x;
                              wTrident.y = player.y;
                           }else if(this.yrDefaultRetrieved){
                              yrDefault.x = player.x;
                              yrDefault.y = player.y;
                           }
                        this.weaponCheck = true;
                        this.bowRetrieved = true;
                        this.moveCount--;
                        if(this.checkForPlayerLeft(player, opponent)){
                           this.readyToFight = true;
                              return false;
                        }
                 }else if(wTrident.x == player.x && wTrident.y == player.y){
                        this.redrawEmptyCell(ct, player, emptyIm);
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.baseWeapon){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.myDefaultRetrieved){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.gunRetrieved){
                              wGun.x = player.x;
                              wGun.y = player.y;
                           }else if(this.bowRetrieved){
                              wBow.x = player.x;
                              wBow.y = player.y;
                           }else if(this.yrDefaultRetrieved){
                              yrDefault.x = player.x;
                              yrDefault.y = player.y;
                           }
                        this.weaponCheck = true;
                        this.tridentRetrieved = true;
                        this.moveCount--;
                        if(this.checkForPlayerLeft(player, opponent)){
                           this.readyToFight = true;
                              return false;
                        }
                 }else if(myDefault.x == player.x && myDefault.y == player.y){
                        this.redrawEmptyCell(ct, player, emptyIm);
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.bowRetrieved){
                              wBow.x = player.x;
                              wBow.y = player.y;
                           }else if(this.gunRetrieved){
                              wGun.x = player.x;
                              wGun.y = player.y;
                           }else if(this.tridentRetrieved){
                              wTrident.x = player.x;
                              wTrident.y = player.y;
                           }else if(this.yourDefaultRetrieved){
                              yrDefault.x = player.x;
                              yrDefault.y = player.y;
                           }
                        this.weaponCheck = true;                        
                        this.myDefaultRetrieved = true;
                        this.baseWeapon = false;
                        this.moveCount--;
                        if(this.checkForPlayerLeft(player, opponent)){
                           this.readyToFight = true;
                              return false;
                        }
                 }else if(yrDefault.x == player.x && yrDefault.y == player.y){
                        this.redrawEmptyCell(ct, player, emptyIm);
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.baseWeapon){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.bowRetrieved){
                              wBow.x = player.x;
                              wBow.y = player.y;
                           }else if(this.gunRetrieved){
                              wGun.x = player.x;
                              wGun.y = player.y;
                           }else if(this.tridentRetrieved){
                              wTrident.x = player.x;
                              wTrident.y = player.y;
                           }
                        this.weaponCheck = true;                        
                        this.yrDefaultRetrieved = true;
                        this.baseWeapon = false;
                        this.moveCount--;
                        if(this.checkForPlayerLeft(player, opponent)){
                           this.readyToFight = true;
                              return false;
                        }
                 }                                                                  
           }else if(this.baseWeapon && this.gunRetrieved){
                    this.redrawEmptyCell(ct, player, emptyIm);
                    this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                    player.x -= 99;
                    this.redrawPlayer(ct, player, currentPlayerIm);
                    wGun.x = player.x;
                    wGun.y = player.y;
                    this.weaponSwapped = "gun";
                    this.baseWeapon = false;
                    this.weaponCheck = false;
                    this.moveCount--;
                    if(this.checkForPlayerLeft(player, opponent)){
                       this.readyToFight = true;
                       return false;
                    }
           }else if(this.baseWeapon && this.bowRetrieved){
                    this.redrawEmptyCell(ct, player, emptyIm);
                    this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                    player.x -= 99;
                    this.redrawPlayer(ct, player, currentPlayerIm);
                    wBow.x = player.x;
                    wBow.y = player.y;
                    this.weaponSwapped = "bow";
                    this.baseWeapon = false;
                    this.weaponCheck = false;
                    this.moveCount--;
                    if(this.checkForPlayerLeft(player, opponent)){
                       this.readyToFight = true;
                       return false;
                    }
           }else if(this.baseWeapon && this.tridentRetrieved){
                    this.redrawEmptyCell(ct, player, emptyIm);
                    this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                    player.x -= 99;
                    this.redrawPlayer(ct, player, currentPlayerIm);
                    wTrident.x = player.x;
                    wTrident.y = player.y;
                    this.weaponSwapped = "trident";
                    this.baseWeapon = false;
                    this.weaponCheck = false;
                    this.moveCount--;
                    if(this.checkForPlayerLeft(player, opponent)){
                       this.readyToFight = true;
                       return false;
                    }
           }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "gun"){
                     this.redrawEmptyCell(ct, player, emptyIm);
                     this.redrawWeapon(ct, player.x, player.y, gunImg);
                     player.x -= 99;
                     this.redrawPlayer(ct, player, currentPlayerIm);
                     this.weaponCheck = false;
                     this.moveCount--;
                     if(this.gunRetrieved && this.bowRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "bow";
                        this.gunRetrieved = false;
                        wBow.x = player.x;
                        wBow.y = player.y;
                     }else if(this.gunRetrieved && !this.bowRetrieved && this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "trident";
                        this.gunRetrieved = false;
                        wTrident.x = player.x;
                        wTrident.y = player.y;
                     }else if(this.gunRetrieved && !this.bowRetrieved && !this.tridentRetrieved && this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.gunRetrieved = false;
                        myDefault.x = player.x;
                        myDefault.y = player.y;
                     }else if(this.gunRetrieved && !this.bowRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.gunRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                     }
                     if(this.checkForPlayerLeft(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
           }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "bow"){
                     this.redrawEmptyCell(ct, player, emptyIm);
                     this.redrawWeapon(ct, player.x, player.y, bowImg);
                     player.x -= 99;
                     this.redrawPlayer(ct, player, currentPlayerIm);
                     this.weaponCheck = false;
                     this.moveCount--;
                        if(this.bowRetrieved && this.gunRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                           this.weaponSwapped = "gun";
                           this.bowRetrieved = false;
                           wGun.x = player.x;
                           wGun.y = player.y;
                        }else if(this.bowRetrieved & !this.gunRetrieved && this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                           this.weaponSwapped = "trident";
                           this.bowRetrieved = false;
                           wTrident.x = player.x;
                           wTrident.y = player.y;
                        }else if(this.bowRetrieved & !this.gunRetrieved && !this.tridentRetrieved && this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                           this.weaponSwapped = "default";
                           this.bowRetrieved = false;
                           myDefault.x = player.x;
                           myDefault.y = player.y;
                        }else if(this.bowRetrieved & !this.gunRetrieved && !this.tridentRetrieved && !this.defaultRetrieved && this.yrDefaultRetrieved){
                           this.weaponSwapped = "default";
                           this.bowRetrieved = false;
                           yrDefault.x = player.x;
                           yrDefault.y = player.y;
                        }
                        if(this.checkForPlayerLeft(player, opponent)){
                           this.readyToFight = true
                           return false;
                        }
           }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "trident"){
                     this.redrawEmptyCell(ct, player, emptyIm);
                     this.redrawWeapon(ct, player.x, player.y, tridentImg);
                     player.x -= 99;
                     this.redrawPlayer(ct, player, currentPlayerIm);
                     this.weaponCheck = false;
                     this.moveCount--;
                        if(this.tridentRetrieved && this.bowRetrieved && !this.gunRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                           this.weaponSwapped = "bow";
                           this.tridentRetrieved = false;
                           wBow.x = player.x;
                           wBow.y = player.y;
                        }else if(this.tridentRetrieved && !this.bowRetrieved && this.gunRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                           this.weaponSwapped = "gun";
                           this.tridentRetrieved = false;
                           wGun.x = player.x;
                           wGun.y = player.y;
                        }else if(this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                           this.weaponSwapped = "default";
                           this.tridentRetrieved = false;
                           myDefault.x = player.x;
                           myDefault.y = player.y;
                        }else if(this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && !this.myDefaultRetrieved && this.yrDefaultRetrieved){
                           this.weaponSwapped = "default";
                           this.tridentRetrieved = false;
                           yrDefault.x = player.x;
                           yrDefault.y = player.y;
                        }
                        if(this.checkForPlayerLeft(player, opponent)){
                           this.readyToFight = true;
                           return false;
                        }
           }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "default"){
                     this.redrawEmptyCell(ct, player, emptyIm);
                     this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                     player.x -= 99;
                     this.redrawPlayer(ct, player, currentPlayerIm);
                     this.weaponCheck = false;
                     this.moveCount--;
                        if(this.myDefaultRetrieved && !this.tridentRetrieved && this.bowRetrieved && !this.gunRetrieved && !this.yrDefaultRetrieved){
                           this.weaponSwapped = "bow";
                           this.myDefaultRetrieved = false;
                           wBow.x = player.x;
                           wBow.y = player.y;
                        }else if(this.myDefaultRetrieved && !this.tridentRetrieved && !this.bowRetrieved && this.gunRetrieved && !this.yrDefaultRetrieved){
                           this.weaponSwapped = "gun";
                           this.myDefaultRetrieved = false;
                           wGun.x = player.x;
                           wGun.y = player.y;
                        }else if(this.myDefaultRetrieved && this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && !this.yrDefaultRetrieved){
                           this.weaponSwapped = "trident";
                           this.myDefaultRetrieved = false;
                           wTrident.x = player.x;
                           wTrident.y = player.y;
                        }else if(this.myDefaultRetrieved && !this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && this.yrDefaultRetrieved){
                           this.weaponSwapped = "default";
                           this.myDefaultRetrieved = false;
                           yrDefault.x = player.x;
                           yrDefault.y = player.y;
                        }
                        if(this.checkForPlayerLeft(player, opponent)){
                           this.readyToFight = true;
                           return false;
                        }             
           }else {
                        this.redrawEmptyCell(ct, player, emptyIm);
                        player.x -= 99;
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.baseWeapon){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.gunRetrieved){
                              wGun.x = player.x;
                              wGun.y = player.y;
                           }else if(this.bowRetrieved){
                              wBow.x = player.x;
                              wBow.y = player.y;
                           }else if(this.tridentRetrieved){
                              wTrident.x = player.x;
                              wTrident.y = player.y;
                           }else if(this.myDefaultRetrieved){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.yrDefaultRetrieved){
                              yrDefault.x = player.x;
                              yrDefault.y = player.y;  
                           }

                        this.moveCount--;
                            if(this.checkForPlayerLeft(player, opponent)){
                              this.readyToFight = true;
                              return false;
                           }
            }

   }

   moveRight(ct, player, opponent, obst, myDefault, yrDefault, wGun, wBow, wTrident, currentPlayerIm, emptyIm, baseWeaponIm, gunImg, bowImg, tridentImg){

        let obstacleCheck = obst;

        if(this.readyToFight){
                     this.redrawPlayer(ct, player, currentPlayerIm);
        }else if(this.moveCount == 0){
                     this.redrawPlayer(ct, player, currentPlayerIm);
                     this.moveCount--;
        }else if(this.moveCount == -1){
                     return true;
        }else if(this.checkForRightObstacle(player, obstacleCheck) || player.x == 892 ) {
                     this.redrawPlayer(ct, player, currentPlayerIm);
        }else if(this.checkForRightWeapon(player, wGun, wBow, wTrident, myDefault, yrDefault) || player.x == 892) {
                     this.redrawEmptyCell(ct, player, emptyIm);
                     player.x += 99;
                     if(wGun.x == player.x && wGun.y == player.y){
                        this.redrawEmptyCell(ct, player, emptyIm);
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.baseWeapon){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.myDefaultRetrieved){
                              Default.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.bowRetrieved){
                              wBow.x = player.x;
                              wBow.y = player.y;
                           }else if(this.tridentRetrieved){
                              wTrident.x = player.x;
                              wTrident.y = player.y;
                           }else if(this.yrDefaultRetrieved){
                              yrDefault.x = player.x;
                              yrDefault.y = player.y;
                           }
                        this.weaponCheck = true;
                        this.gunRetrieved = true;
                        this.moveCount--;
                        if(this.checkForPlayerRight(player, opponent)){
                           this.readyToFight = true;
                           return false;
                        }
                     }else if(wBow.x == player.x && wBow.y == player.y){
                        this.redrawEmptyCell(ct, player, emptyIm);
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.baseWeapon){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.myDefaultRetrieved){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.gunRetrieved){
                              wGun.x = player.x;
                              wGun.y = player.y;
                           }else if(this.tridentRetrieved){
                              wTrident.x = player.x;
                              wTrident.y = player.y;
                           }else if(this.yrDefaultRetrieved){
                              yrDefault.x = player.x;
                              yrDefault.y = player.y;
                           }
                        this.weaponCheck = true;
                        this.bowRetrieved = true;
                        this.moveCount--;
                        if(this.checkForPlayerRight(player, opponent)){
                           this.readyToFight = true;
                           return false;
                        }
                     }else if(wTrident.x == player.x && wTrident.y == player.y){
                        this.redrawEmptyCell(ct, player, emptyIm);
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.baseWeapon){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.myDefaultRetrieved){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.gunRetrieved){
                              wGun.x = player.x;
                              wGun.y = player.y;
                           }else if(this.bowRetrieved){
                              wBow.x = player.x;
                              wBow.y = player.y;
                           }else if(this.yrDefaultRetrieved){
                              yrDefault.x = player.x;
                              yrDefault.y = player.y;
                           }
                        this.weaponCheck = true;
                        this.tridentRetrieved = true;
                        this.moveCount--;
                        if(this.checkForPlayerRight(player, opponent)){
                           this.readyToFight = true;
                           return false;
                        }
                  }else if(myDefault.x == player.x && myDefault.y == player.y){
                        this.redrawEmptyCell(ct, player, emptyIm);
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.bowRetrieved){
                              wBow.x = player.x;
                              wBow.y = player.y;
                           }else if(this.gunRetrieved){
                              wGun.x = player.x;
                              wGun.y = player.y;
                           }else if(this.tridentRetrieved){
                              wTrident.x = player.x;
                              wTrident.y = player.y;
                           }else if(this.yrDefaultRetrieved){
                              yrDefault.x = player.x;
                              yrDefault.y = player.y;
                           }
                        this.weaponCheck = true;
                        this.myDefaultRetrieved = true;
                        this.baseWeapon = false;
                        this.moveCount--;
                        if(this.checkForPlayerRight(player, opponent)){
                           this.readyToFight = true;
                           return false;
                        }
                  }else if(yrDefault.x == player.x && yrDefault.y == player.y){
                        this.redrawEmptyCell(ct, player, emptyIm);
                        this.redrawPlayer(ct, player, currentPlayerIm);
                           if(this.baseWeapon){
                              myDefault.x = player.x;
                              myDefault.y = player.y;
                           }else if(this.bowRetrieved){
                              wBow.x = player.x;
                              wBow.y = player.y;
                           }else if(this.gunRetrieved){
                              wGun.x = player.x;
                              wGun.y = player.y;
                           }else if(this.tridentRetrieved){
                              wTrident.x = player.x;
                              wTrident.y = player.y;
                           }     
                        this.weaponCheck = true;                        
                        this.yrDefaultRetrieved = true;
                        this.baseWeapon = false;
                        this.moveCount--;
                        if(this.checkForPlayerRight(player, opponent)){
                           this.readyToFight = true;
                           return false;
                        }
                  }
         }else if(this.baseWeapon && this.gunRetrieved){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                  player.x += 99;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  wGun.x = player.x;
                  wGun.y = player.y;
                  this.weaponSwapped = "gun";
                  this.weaponCheck = false;
                  this.baseWeapon = false;
                  this.moveCount--;
                  if(this.checkForPlayerRight(player, opponent)){
                     this.readyToFight = true;
                     return false;
                  }
         }else if(this.baseWeapon && this.bowRetrieved){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                  player.x += 99;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  wBow.x = player.x;
                  wBow.y = player.y;
                  this.weaponSwapped = "bow";
                  this.weaponCheck = false;
                  this.baseWeapon = false;
                  this.moveCount--;
                  if(this.checkForPlayerRight(player, opponent)){
                     this.readyToFight = true;
                     return false;
                  }
         }else if(this.baseWeapon && this.tridentRetrieved){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                  player.x += 99;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  wTrident.x = player.x;
                  wTrident.y = player.y;
                  this.weaponSwapped = "trident";
                  this.weaponCheck = false;
                  this.baseWeapon = false;
                  this.moveCount--;
                  if(this.checkForPlayerRight(player, opponent)){
                     this.readyToFight = true;
                     return false;
                  }
         }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "gun"){
                   this.redrawEmptyCell(ct, player, emptyIm);
                   this.redrawWeapon(ct, player.x, player.y, gunImg);
                   player.x += 99;
                   this.redrawPlayer(ct, player, currentPlayerIm);
                   this.weaponCheck = false;
                   this.moveCount--;
                     if(this.gunRetrieved && this.bowRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "bow";
                        this.gunRetrieved = false;
                        wBow.x = player.x;
                        wBow.y = player.y;
                     }else if(this.gunRetrieved && !this.bowRetrieved && this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "trident";
                        this.gunRetrieved = false;
                        wTrident.x = player.x;
                        wTrident.x = player.y;
                     }else if(this.gunRetrieved && !this.bowRetrieved && !this.tridentRetrieved && this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.gunRetrieved = false;
                        myDefault.x = player.x;
                        myDefault.y = player.y;
                     }else if(this.gunRetrieved && !this.bowRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.gunRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                     }
                     if(this.checkForPlayerRight(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
         }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "bow"){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, bowImg);
                  player.x += 99;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  this.weaponCheck = false;
                  this.moveCount--;
                     if(this.bowRetrieved && this.gunRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "gun";
                        this.bowRetrieved = false;
                        wGun.x = player.x;
                        wGun.y = player.y;
                     }else if(this.bowRetrieved & !this.gunRetrieved && this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "trident";
                        this.bowRetrieved = false;
                        wTrident.x = player.x;
                        wTrident.y = player.y;
                     }else if(this.bowRetrieved & !this.gunRetrieved && !this.tridentRetrieved && this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.weapomSwapped = false;
                        myDefault.x = player.x;
                        myDefault.x = player.y;
                     }else if(this.bowRetrieved & !this.gunRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.weapomSwapped = false;
                        yrDefault.x = player.x;
                        yrDefault.x = player.y;
                     }
                     if(this.checkForPlayerRight(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
         }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "trident"){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, tridentImg);
                  player.x += 99;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  this.weaponCheck = false;
                  this.moveCount--;
                     if(this.tridentRetrieved && this.bowRetrieved && !this.gunRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "bow";
                        this.tridentRetrieved = false;
                        wBow.x = player.x;
                        wBow.y = player.y;
                     }else if(this.tridentRetrieved && !this.bowRetrieved && this.gunRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "gun";
                        this.tridentRetrieved = false;
                        wGun.x = player.x;
                        wGun.y = player.y;
                     }else if(this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.tridentRetrieved = false;
                        myDefault.x = player.x;
                        myDefault.y = player.y;
                     }else if(this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && !this.myDefaultRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.tridentRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                     }
                     if(this.checkForPlayerRight(player, opponent)){
                        this.readyToFight = true;
                        console.log("1.there is a player on the left");
                        return false;
                     }
         }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "default"){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                  player.x += 99;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  this.weaponCheck = false;
                  this.moveCount--;
                     if(this.myDefaultRetrieved && !this.tridentRetrieved && this.bowRetrieved && !this.gunRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "bow";
                        this.myDefaultRetrieved = false;
                        wBow.x = player.x;
                        wBow.y = player.y;
                     }else if(this.myDefaultRetrieved && !this.tridentRetrieved && !this.bowRetrieved && this.gunRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "gun";
                        this.myDefaultRetrieved = false;
                        wGun.x = player.x;
                        wGun.y = player.y;
                     }else if(this.myDefaultRetrieved && this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "trident";
                        this.myDefaultRetrieved = false;
                        wTrident.x = player.x;
                        wTrident.y = player.y;
                     }else if(this.myDefaultRetrieved && !this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.myDefaultRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                     }  
                     if(this.checkForPlayerRight(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
         }else {
                     this.redrawEmptyCell(ct, player, emptyIm);
                     player.x += 99;
                     this.redrawPlayer(ct, player, currentPlayerIm);
                        if(this.baseWeapon){
                           myDefault.x = player.x;
                           myDefault.y = player.y;
                        }else if(this.gunRetrieved){
                           wGun.x = player.x;
                           wGun.y = player.y;
                        }else if(this.bowRetrieved){
                           wBow.x = player.x;
                           wBow.y = player.y;
                        }else if(this.tridentRetrieved){
                           wTrident.x = player.x;
                           wTrident.y = player.y;
                        }else if(this.myDefaultRetrieved){
                           myDefault.x = player.x;
                           myDefault.y = player.y;
                        }else if(this.yrDefaultRetrieved){
                           yrDefault.x = player.x;
                           yrDefault.y = player.y;
                        }

                     this.moveCount--;
                     if(this.checkForPlayerRight(player, opponent)){
                        this.readyToFight = true;
                        console.log("1.there is a player on the left");
                        return false;
                     }
         }

   }

   moveUp(ct, player, opponent, obst, myDefault, yrDefault, wGun, wBow, wTrident, currentPlayerIm, emptyIm, baseWeaponIm, gunImg, bowImg, tridentImg){

         let obstacleCheck = obst;

         if(this.readyToFight){
            this.redrawPlayer(ct, player, currentPlayerIm);
        }else if(this.moveCount == 0){
            this.redrawPlayer(ct, player, currentPlayerIm);
            this.moveCount--;
         }else if(this.moveCount == -1){
            return true;
         }else if(this.checkForTopObstacle(player, obstacleCheck) || player.y == 2){
            this.redrawPlayer(ct, player, currentPlayerIm);
         }else if(this.checkForTopWeapon(player, wGun, wBow, wTrident, myDefault, yrDefault) || player.y == 2){  
            this.redrawEmptyCell(ct, player, emptyIm);
            player.y -= 72;
            if(wGun.x == player.x && wGun.y == player.y){
               this.redrawEmptyCell(ct, player, emptyIm);
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.baseWeapon){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.myDefaultRetrieved){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.bowRetrieved){
                     wBow.x = player.x;
                     wBow.y = player.y;
                  }else if(this.tridentRetrieved){
                     wTrident.x = player.x;
                     wTrident.y = player.y;
                  }else if(this.yrDefaultRetrieved){
                     yrDefault.x = player.x;
                     yrDefault.y = player.y;
                  }
               this.weaponCheck = true;
               this.gunRetrieved = true;
               this.moveCount--;
               if(this.checkForPlayerAbove(player, opponent)){
                  this.readyToFight = true;
                  return false;
               }
            }else if(wBow.x == player.x && wBow.y == player.y){
               this.redrawEmptyCell(ct, player, emptyIm);
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.baseWeapon){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.myDefaultRetrieved){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.gunRetrieved){
                     wGun.x = player.x;
                     wGun.y = player.y;
                  }else if(this.tridentRetrieved){
                     wTrident.x = player.x;
                     wTrident.y = player.y;
                  }else if(this.yrDefaultRetrieved){
                     yrDefault.x = player.x;
                     yrDefault.y = player.y;
                  }
               this.weaponCheck = true;
               this.bowRetrieved = true;
               this.moveCount--;
               if(this.checkForPlayerAbove(player, opponent)){
                  this.readyToFight = true;
                  return false;
               }
           }else if(wTrident.x == player.x && wTrident.y == player.y){
               this.redrawEmptyCell(ct, player, emptyIm);
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.baseWeapon){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.myDefaultRetrieved){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.gunRetrieved){
                     wGun.x = player.x;
                     wGun.y = player.y;
                  }else if(this.bowRetrieved){
                     wBow.x = player.x;
                     wBow.y = player.y;
                  }else if(this.yrDefaultRetrieved){
                     yrDefault.x = player.x;
                     yrDefault.y = player.y;
                  }
               this.weaponCheck = true;
               this.tridentRetrieved = true;
               this.moveCount--;
               if(this.checkForPlayerAbove(player, opponent)){
                  this.readyToFight = true;
                  return false;
               }
           }else if(myDefault.x == player.x && myDefault.y == player.y){
               this.redrawEmptyCell(ct, player, emptyIm);
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.bowRetrieved){
                     wBow.x = player.x;
                     wBow.y = player.y;
                  }else if(this.gunRetrieved){
                     wGun.x = player.x;
                     wGun.y = player.y;
                  }else if(this.tridentRetrieved){
                     wTrident.x = player.x;
                     wTrident.y = player.y;
                  }else if(this.yrDefaultRetrieved){
                     yrDefault.x = player.x;
                     yrDefault.y = player.y;
                  }
               this.weaponCheck = true;
               this.defaultRetrieved = true;
               this.baseWeapon = false;
               this.moveCount--;
               if(this.checkForPlayerAbove(player, opponent)){
                  this.readyToFight = true;
                  return false;
               }
           }else if(yrDefault.x == player.x && yrDefault.y == player.y){
               this.redrawEmptyCell(ct, player, emptyIm);
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.baseWeapon){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.bowRetrieved){
                     wBow.x = player.x;
                     wBow.y = player.y;
                  }else if(this.gunRetrieved){
                     wGun.x = player.x;
                     wGun.y = player.y;
                  }else if(this.tridentRetrieved){
                     wTrident.x = player.x;
                     wTrident.y = player.y;
                  }
               this.weaponCheck = true;                        
               this.yrDefaultRetrieved = true;
               this.baseWeapon = false;
               this.moveCount--;
              if(this.checkForPlayerAbove(player, opponent)){
                 this.readyToFight = true;
                return false;
              }
           }
         }else if(this.baseWeapon && this.gunRetrieved){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                  player.y -= 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  wGun.x = player.x;
                  wGun.y = player.y;
                  this.weaponSwapped = "gun";
                  this.weaponCheck = false;
                  this.baseWeapon = false;
                  this.moveCount--;
                  if(this.checkForPlayerAbove(player, opponent)){
                     this.readyToFight = true;
                     return false;
                  }
         }else if(this.baseWeapon && this.bowRetrieved){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                  player.y -= 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  this.weaponSwapped = "bow";
                  wBow.x = player.x;
                  wBow.y = player.y;
                  this.weaponCheck = false;
                  this.baseWeapon = false;
                  this.moveCount--;
                  if(this.checkForPlayerAbove(player, opponent)){
                     this.readyToFight = true;
                     return false;
                  }
         }else if(this.baseWeapon && this.tridentRetrieved){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                  player.y -= 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  wTrident.x = player.x;
                  wTrident.y = player.y;
                  this.weaponSwapped = "trident";
                  this.weaponCheck = false;
                  this.baseWeapon = false;
                  this.moveCount--;
                  if(this.checkForPlayerAbove(player, opponent)){
                     this.readyToFight = true;
                     return false;
                  }
         }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "gun"){
                   this.redrawEmptyCell(ct, player, emptyIm);
                   this.redrawWeapon(ct, player.x, player.y, gunImg);
                   player.y -= 72;
                   this.redrawPlayer(ct, player, currentPlayerIm);
                   this.weaponCheck = false;
                   this.moveCount--;
                      if(this.gunRetrieved && this.bowRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                         this.weaponSwapped = "bow";
                         this.gunRetrieved = false;
                         wBow.x = player.x;
                         wBow.y = player.y;
                       }else if(this.gunRetrieved && this.tridentRetrieved && !this.bowRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                         this.weaponSwapped = "trident";
                         this.gunRetrieved = false;
                         wTrident.x = player.x;
                         wTrident.y = player.y;
                       }else if(this.gunRetrieved && this.myDefaultRetrieved && !this.bowRetrieved && !this.tridentRetrieved && !this.yrDefaultRetrieved){
                         this.weaponSwapped = "default";
                         this.gunRetrieved = false;
                         myDefault.x = player.x;
                         myDefault.y = player.y;
                       }else if(this.gunRetrieved && !this.myDefaultRetrieved && !this.bowRetrieved && !this.tridentRetrieved && this.yrDefaultRetrieved){
                         this.weaponSwapped = "default";
                         this.gunRetrieved = false;
                         yrDefault.x = player.x;
                         yrDefault.y = player.y;
                       }
                     if(this.checkForPlayerAbove(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
        }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "bow"){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, bowImg);
                  player.y -= 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  this.weaponCheck = false;
                  this.moveCount--;
                     if(this.bowRetrieved && this.gunRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "gun";
                        this.bowRetrieved = false;
                        wGun.x = player.x;
                        wGun.y = player.y;
                     }else if(this.bowRetrieved & this.tridentRetrieved && !this.gunRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "trident";
                        this.bowRetrieved = false;
                        wTrident.x = player.x;
                        wTrident.y = player.y;
                     }else if(this.bowRetrieved && this.myDefaultRetrieved && !this.gunRetrieved && !this.tridentRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.bowRetrieved = false;
                        myDefault.x = player.x;
                        myDefault.y = player.y;
                     }else if(this.bowRetrieved && !this.myDefaultRetrieved && !this.gunRetrieved && !this.tridentRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.bowRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                     }
                     if(this.checkForPlayerAbove(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
        }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "trident"){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, tridentImg);
                  wTrident.x = player.x;
                  wTrident.y = player.y;
                  player.y -= 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  this.weaponCheck = false;
                  this.moveCount--;
                     if(this.tridentRetrieved && this.bowRetrieved && !this.gunRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "bow";
                        this.tridentRetrieved = false;
                        wBow.x = player.x;
                        wBow.y = player.y;
                     }else if(this.tridentRetrieved && this.gunRetrieved && !this.bowRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "gun";
                        this.tridentRetrieved = false;
                        wGun.x = player.x;
                        wGun.y = player.y;
                     }else if(this.tridentRetrieved && this.myDefaultRetrieved && !this.gunRetrieved && !this.bowRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.tridentRetrieved = false;
                        myDefault.x = player.x;
                        myDefault.y = player.y;
                     }else if(this.tridentRetrieved && !this.myDefaultRetrieved && !this.gunRetrieved && !this.bowRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.tridentRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                     }
                     if(this.checkForPlayerAbove(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
         }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "default"){
                   this.redrawEmptyCell(ct, player, emptyIm);
                   this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                   player.y -= 72;
                   this.redrawPlayer(ct, player, currentPlayerIm);
                   this.weaponCheck = false;
                   this.moveCount--;
                      if(this.myDefaultRetrieved && this.bowRetrieved && !this.tridentRetrieved && !this.gunRetrieved && !this.yrDefaultRetrieved){
                         this.weaponSwapped = "bow";
                         this.myDefaultRetrieved = false;
                         wBow.x = player.x;
                         wBow.y = player.y;
                     }else if(this.myDefaultRetrieved && this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "trident";
                        this.myDefaultRetrieved = false;
                        wGun.x = player.x;
                        wGun.y = player.y;
                     }else if(this.myDefaultRetrieved && this.gunRetrieved && !this.bowRetrieved && !this.tridentRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "gun";
                        this.myDefaultRetrieved = false;
                        wTrident.x = player.x;
                        wTrident.y = player.y;
                     }else if(this.myDefaultRetrieved && !this.gunRetrieved && !this.bowRetrieved && !this.tridentRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.myDefaultRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                     }
                     if(this.checkForPlayerAbove(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
         }else {
                     this.redrawEmptyCell(ct, player, emptyIm);
                     player.y -= 72;
                     this.redrawPlayer(ct, player, currentPlayerIm);
                        if(this.baseWeapon){
                           myDefault.x = player.x;
                           myDefault.y = player.y;
                        }else if(this.gunRetrieved){
                           wGun.x = player.x;
                           wGun.y = player.y;
                        }else if(this.bowRetrieved){
                           wBow.x = player.x;
                           wBow.y = player.y;
                        }else if(this.tridentRetrieved){
                           wTrident.x = player.x;
                           wTrident.y = player.y;
                        }else if(this.myDefaultRetrieved){
                           myDefault.x = player.x;
                           myDefault.y = player.y;
                        }else if(this.yrDefaultRetrieved){
                           yrDefault.x = player.x;
                           yrDefault.y = player.y;
                        }
                     this.moveCount--;
                     if(this.checkForPlayerAbove(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
        }
     
   }

   moveDown(ct, player, opponent, obst, myDefault, yrDefault, wGun, wBow, wTrident, currentPlayerIm, emptyIm, baseWeaponIm, gunImg, bowImg, tridentImg) {

         let obstacleCheck = obst;
   
         if(this.readyToFight){
            this.redrawPlayer(ct, player, currentPlayerIm);
          }else if(this.moveCount == 0){
            this.redrawPlayer(ct, player, currentPlayerIm);
            this.moveCount--;
          }else if(this.moveCount == -1){
            return true;
          }else if(this.checkForBelowObstacle(player, obstacleCheck) || player.y == 650) {
            this.redrawPlayer(ct, player, currentPlayerIm);
         }else if(this.checkForBelowWeapon(player, wGun, wBow, wTrident, myDefault, yrDefault) || player.y == 650){
            this.redrawEmptyCell(ct, player, emptyIm);
            player.y += 72;
            if(wGun.x == player.x && wGun.y == player.y){
               this.redrawEmptyCell(ct, player, emptyIm);
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.baseWeapon){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.myDefaultRetrieved){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.bowRetrieved){
                     wBow.x = player.x;
                     wBow.y = player.y;
                  }else if(this.tridentRetrieved){
                     wTrident.x = player.x;
                     wTrident.y = player.y;
                  }else if(this.yrDefaultRetrieved){
                     yrDefault.x = player.x;
                     yrDefault.y = player.y;
                  }
               this.weaponCheck = true;
               this.gunRetrieved = true;
               this.moveCount--;
               if(this.checkForPlayerBelow(player, opponent)){
                  this.readyToFight = true;
                  return false;
               }
            }else if(wBow.x == player.x && wBow.y == player.y){
               this.redrawEmptyCell(ct, player, emptyIm);
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.baseWeapon){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                 }else if(this.myDefaultRetrieved){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                 }else if(this.gunRetrieved){
                     wGun.x = player.x;
                     wGun.y = player.y;
                 }else if(this.tridentRetrieved){
                     wTrident.x = player.x;
                     wTrident.y = player.y;
                 }else if(this.yrDefaultRetrieved){
                     yrDefault.x = player.x;
                     yrDefault.y = player.y;
                 }
               this.weaponCheck = true;
               this.bowRetrieved = true;
               this.moveCount--;
               if(this.checkForPlayerBelow(player, opponent)){
                  this.readyToFight = true;
                  return false;
                }
           }else if(wTrident.x == player.x && wTrident.y == player.y){
               this.redrawEmptyCell(ct, player, emptyIm);
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.baseWeapon){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.myDefaultRetrieved){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.gunRetrieved){
                     wGun.x = player.x;
                     wGun.y = player.y;
                  }else if(this.bowRetrieved){
                     wBow.x = player.x;
                     wBow.y = player.y;
                  }else if(this.yrDefaultRetrieved){
                     yrDefault.x = player.x;
                     yrDefault.y = player.y;
                  }
               this.weaponCheck = true;
               this.tridentRetrieved = true;
               this.moveCount--;
               if(this.checkForPlayerBelow(player, opponent)){
                  this.readyToFight = true;
                  return false;
               }
           }else if(myDefault.x == player.x && myDefault.y == player.y){
               this.redrawEmptyCell(ct, player, emptyIm);
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.bowRetrieved){
                     wBow.x = player.x;
                     wBow.y = player.y;
                 }else if(this.gunRetrieved){
                     wGun.x = player.x;
                     wGun.y = player.y;
                 }else if(this.tridentRetrieved){
                     wTrident.x = player.x;
                     wTrident.y = player.y;
                 }else if(this.yrDefaultRetrieved){
                     yrDefault.x = player.x;
                     yrDefault.y = player.y;
                 }
               this.weaponCheck = true;
               this.myDefaultRetrieved = true;
               this.baseWeapon = false;
               this.moveCount--;
               if(this.checkForPlayerBelow(player, opponent)){
                  this.readyToFight = true;
                  return false;
                }
           }else if(yrDefault.x == player.x && yrDefault.y == player.y){
               this.redrawEmptyCell(ct, player, emptyIm);
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.baseWeapon){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.bowRetrieved){
                     wBow.x = player.x;
                     wBow.y = player.y;
                  }else if(this.gunRetrieved){
                     wGun.x = player.x;
                     wGun.y = player.y;
                 }else if(this.tridentRetrieved){
                     wTrident.x = player.x;
                     wTrident.y = player.y;
                 }
               this.weaponCheck = true;                        
               this.yrDefaultRetrieved = true;
               this.baseWeapon = false;
               this.moveCount--;
               if(this.checkForPlayerBelow(player, opponent)){
                  this.readyToFight = true;
                  return false;
               }
            }
         }else if(this.baseWeapon && this.gunRetrieved){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                  player.y += 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  wGun.x = player.x;
                  wGun.y = player.y;
                  this.weaponSwapped = "gun";
                  this.weaponCheck = false;
                  this.baseWeapon = false;
                  this.moveCount--;
                  if(this.checkForPlayerBelow(player, opponent)){
                     this.readyToFight = true;
                     return false;
                  }
         }else if(this.baseWeapon && this.bowRetrieved){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                  player.y += 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  wBow.x = player.x;
                  wBow.y = player.y;
                  this.weaponSwapped = "bow";
                  this.weaponCheck = false;
                  this.baseWeapon = false;
                  this.moveCount--;
                  if(this.checkForPlayerBelow(player, opponent)){
                     this.readyToFight = true;
                     return false;
                  }
        }else if(this.baseWeapon && this.tridentRetrieved){
                 this.redrawEmptyCell(ct, player, emptyIm);
                 this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                 player.y += 72;
                 this.redrawPlayer(ct, player, currentPlayerIm);
                 wTrident.x = player.x;
                 wTrident.y = player.y;
                 this.weaponSwapped = "trident";
                 this.weaponCheck = false;
                 this.baseWeapon = false;
                 this.moveCount--;
                 if(this.checkForPlayerBelow(player, opponent)){
                    this.readyToFight = true;
                    return false;
                 }
        }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "gun"){
                  this.redrawEmptyCell(ct, player, emptyIm);                      
                  this.redrawWeapon(ct, player.x, player.y, gunImg);
                  player.y += 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  this.weaponCheck = false;
                  this.moveCount--;
                     if(this.gunRetrieved && this.bowRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "bow";
                        this.gunRetrieved = false;
                        wBow.x = player.x;
                        wBow.y = player.y;
                     }else if(this.gunRetrieved && !this.bowRetrieved && this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "trident";
                        this.gunRetrieved = false;
                        wTrident.x = player.x;
                        wTrident.y = player.y;
                     }else if(this.gunRetrieved && !this.bowRetrieved && !this.tridentRetrieved && this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.gunRetrieved = false;
                        myDefault.x = player.x;
                        myDefault.y = player.y;
                     }else if(this.gunRetrieved && !this.bowRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.gunRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                     }
                     if(this.checkForPlayerBelow(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
        }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "bow"){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, bowImg);
                  player.y += 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  this.weaponCheck = false;
                  this.moveCount--;
                     if(this.bowRetrieved && this.gunRetrieved && !this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "gun";
                        this.bowRetrieved = false;
                        wGun.x = player.x;
                        wGun.y = player.y;
                     }else if(this.bowRetrieved && !this.gunRetrieved && this.tridentRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "trident";
                        this.bowRetrieved = false;
                        wTrident.x = player.x;
                        wTrident.y = player.y;
                     }else if(this.bowRetrieved && !this.gunRetrieved && !this.tridentRetrieved && this.defaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.bowRetrieved = false;
                        myDefault.x = player.x;
                        myDefault.y = player.y;
                     }else if(this.bowRetrieved && !this.gunRetrieved && !this.tridentRetrieved && !this.defaultRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.bowRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                     }
                     if(this.checkForPlayerBelow(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
        }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "trident"){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, tridentImg);
                  player.y += 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  this.weaponCheck = false;
                  this.moveCount--;
                     if(this.tridentRetrieved && this.bowRetrieved && !this.gunRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "bow";
                        this.tridentRetrieved = false;
                        wTrident.x = player.x;
                        wTrident.y = player.y;
                     }else if(this.tridentRetrieved && !this.bowRetrieved && this.gunRetrieved && !this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "gun";
                        this.tridentRetrieved = false;
                        wGun.x = player.x;
                        wGun.y = player.y;
                     }else if(this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && this.myDefaultRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "default"
                        this.tridentRetrieved = false;
                        myDefault.x = player.x;
                        myDefault.y = player.y;
                     }else if(this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && !this.myDefaultRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default"
                        this.tridentRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                     }
                     if(this.checkForPlayerBelow(player, opponent)){
                        this.readyToFight = true;
                        return false;
                     }
        }else if(!this.baseWeapon && this.weaponCheck && this.weaponSwapped == "default"){
                  this.redrawEmptyCell(ct, player, emptyIm);
                  this.redrawWeapon(ct, player.x, player.y, baseWeaponIm);
                  player.y += 72;
                  this.redrawPlayer(ct, player, currentPlayerIm);
                  this.weaponCheck = false;
                  this.moveCount--;
                     if(this.myDefaultRetrieved && !this.tridentRetrieved && this.bowRetrieved && !this.gunRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "bow";
                        this.myDefaultRetrieved = false;
                        wBow.x = player.x;
                        wBow.y = player.y;
                     }else if(this.myDefaultRetrieved && !this.tridentRetrieved && !this.bowRetrieved && this.gunRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "gun";
                        this.myDefaultRetrieved = false;
                        wGun.x = player.x;
                        wGun.y = player.y;
                     }else if(this.myDefaultRetrieved && this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && !this.yrDefaultRetrieved){
                        this.weaponSwapped = "trident";
                        this.myDefaultRetrieved = false;
                        wTrident.x = player.x;
                        wTrident.y = player.y;
                     }else if(this.myDefaultRetrieved && !this.tridentRetrieved && !this.bowRetrieved && !this.gunRetrieved && this.yrDefaultRetrieved){
                        this.weaponSwapped = "default";
                        this.myDefaultRetrieved = false;
                        yrDefault.x = player.x;
                        yrDefault.y = player.y;
                    }  
                    if(this.checkForPlayerBelow(player, opponent)){
                       this.readyToFight = true;
                       return false;
                    }
        }else {
               this.redrawEmptyCell(ct, player, emptyIm);
               player.y += 72;
               this.redrawPlayer(ct, player, currentPlayerIm);
                  if(this.baseWeapon){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.gunRetrieved){
                     wGun.x = player.x;
                     wGun.y = player.y;
                  }else if(this.bowRetrieved){
                     wBow.x = player.x;
                     wBow.y = player.y;
                  }else if(this.tridentRetrieved){
                     wTrident.x = player.x;
                     wTrident.y = player.y;
                  }else if(this.myDefaultRetrieved){
                     myDefault.x = player.x;
                     myDefault.y = player.y;
                  }else if(this.yrDefaultRetrieved){
                     yrDefault.x = player.x;
                     yrDefault.y = player.y;
                 }
               this.moveCount--;
               if(this.checkForPlayerBelow(player, opponent)){
                  this.readyToFight = true;
                  return false;
               }
         }
     
   }
 


   attack() {
 
      //animate player with JQuery

   }

   defend() {
 
      //animate player with JQuery

   }

   endTurn() {

      return true;

   }

   
}

class Weapon {
 
   constructor(url, width, height, damageCapacity, weaponX, weaponY) {
 
         this.url = url;
         this.width = width;
         this.height = height;
         this.damageCapacity = damageCapacity;
         this.x = weaponX;
         this.y = weaponY;

  }
 
}
 
 
 
class Cell {

   constructor(x, y, i, j){

         this.i = i;
         this.j = j;
         this.x = x;
         this.y = y;
         this.f = 0;
         this.g = 0;
         this.h = 0;
         this.neighbours = [];
         this.obstacle = false;
         this.player = false;
         this.weapon = false;
         this.previous = undefined;
  }



   addNeighbours(i, j, grid) {

         this.i = i;
         this.j = j;


         if(i < gameBoard.coordinatesY.length - 1){
               this.neighbours.push(grid[i + 1][j]);
         }
         if(i > 0){
               this.neighbours.push(grid[i - 1][j]);
         }
            if(j < gameBoard.coordinatesX.length - 1){
               this.neighbours.push(grid[i][j + 1]);
         }
         if(j > 0){
               this.neighbours.push(grid[i][ j - 1]);
         }

   }

}

class Obstacle {

   constructor(url, width, height, coordinates){

         this.url = url;
         this.width = width;
         this.height = height;
         this.x = coordinates[0];
         this.y = coordinates[1];  
   }

 }
 
           
class inputHandler {

   constructor(ctx, player1, player2, obs, d1, d2, gun, bow, trident, p1Im, p2Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm, attack, defend){
      this.attack = attack; //check what arguments are passed to these parameters
      this.defend = defend;
      document.addEventListener("keydown", (event) => {
         event.preventDefault();
            switch(event.keyCode){
              case 37:
              this.turnComplete1 = player1.moveLeft(ctx, player1, player2, obs, d1, d2, gun, bow, trident, p1Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                 if(this.turnComplete1){
                    this.turnComplete2 = player2.moveLeft(ctx, player2, player1, obs, d2, d1, gun, bow, trident, p2Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                       if(this.turnComplete2){
                          player1.moveCount = 3;
                          player2.moveCount = 3;
                          this.turnComplete1 = player1.moveLeft(ctx, player1, player2, obs, d1, d2, gun, bow, trident, p1Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                       }else if(!this.turnComplete2){
                           this.attack.disabled = false;
                           this.defend.disabled = false;
                       }
                }else if(!this.turnComplete1){
                    this.attack.disabled = false;
                    this.defend.disabled = false;
                }
              break;
              case 39:
              this.turnComplete1 = player1.moveRight(ctx, player1, player2, obs, d1, d2, gun, bow, trident, p1Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                 if(this.turnComplete1){
                    this.turnComplete2 = player2.moveRight(ctx, player2, player1, obs, d2, d1, gun, bow, trident, p2Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                       if(this.turnComplete2){
                          player1.moveCount = 3;
                          player2.moveCount = 3;
                          this.turnComplete1 = player1.moveRight(ctx, player1, player2, obs, d1, d2, gun, bow, trident, p1Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm); 
                       }else if(!this.turnComplete2){
                           this.attack.disabled = false;
                           this.defend.disabled = false;
                       }
                }else if(!this.turnComplete1){
                    this.attack.disabled = false;
                    this.defend.disabled = false;
                }
              break;
              case 38:
              this.turnComplete1 = player1.moveUp(ctx, player1, player2, obs, d1, d2, gun, bow, trident, p1Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                 if(this.turnComplete1){
                     this.turnComplete2 = player2.moveUp(ctx, player2, player1, obs, d2, d1, gun, bow, trident, p2Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                        if(this.turnComplete2){
                           player1.moveCount = 3;
                           player2.moveCount = 3;
                           this.turnComplete1 = player1.moveUp(ctx, player1, player2, obs, d1, d2, gun, bow, trident, p1Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                        }else if(!this.turnComplete2){
                            this.attack.disabled = false;
                            this.defend.disabled = false;
                        }
                 }else if(!this.turnComplete1){
                     this.attack.disabled = false;
                     this.defend.disabled = false;
                 }
               break;
               case 40:
               this.turnComplete1 = player1.moveDown(ctx, player1, player2, obs, d1, d2, gun, bow, trident, p1Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                  if(this.turnComplete1){
                     this.turnComplete2 = player2.moveDown(ctx, player2, player1, obs, d2, d1, gun, bow, trident, p2Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                        if(this.turnComplete2){
                           player1.moveCount = 3;
                           player2.moveCount = 3;
                           this.turnComplete1 = player1.moveDown(ctx, player1, player2, obs, d1, d2, gun, bow, trident, p1Im, cellIm, defWeaponIm, gunIm, bowIm, tridentIm);
                        }else if(!this.turnComplete2){
                            this.attack.disabled = false;
                            this.defend.disabled = false;
                        }
                }else if(!this.turnComplete1){
                   this.attack.disabled = false;
                   this.defend.disabled = false;
                }
               break;
 
            }

      });

      this.endTurn = document.querySelector("#endButton");

            this.endTurn.addEventListener("click", (p1, p2) => {

               p1 = player1;
               p2 = player2;

               if(p1.moveCount > 0 && p1.moveCount < 3){
                     this.player1EndTurn = p1.endTurn();  
                          if(this.player1EndTurn){
                              p1.moveCount = 0;
                          }
               }else if(p2.moveCount > 0 && p2.moveCount < 3){
                     this.player2EndTurn = p2.endTurn();
                          if(this.player2EndTurn) {
                             p2.moveCount = 0;
                          }
               }

           });


            this.attack = document.querySelector("#attackButton");

            this.defend = document.querySelector("#defendButton");
 
           /* this.attack.addEventListener("click", (p1, p2) => {

            //need some way of knowing which player moved to the 
            //adjacent posiiton coz they get first control of the 
            //attack button so need an if else here for the players

                              p1.attack();

              });
 
            this.defend.addEventListener("click", (p1, p2) => {

            //need some way of knowing which player moved to the 
            //adjacent posiiton coz they get first control of the 
            //attack defend so need an if else here for the players

                               p1.defend();
             });*/
  }
}

     
function createT(index){

         let id = index;

         let tbl = document.getElementById("tbl");

         for(let r = 0; r < 10; r++){
             let row = document.createElement("tr");
                 for(let c = 0; c < 10; c++){
                     let cell = document.createElement("td");
                     cell.width = "94px";
                     cell.height = "70px";
                     cell.id = id++;
                     cell.style.backgroundColor = "transparent";
                     row.appendChild(cell);

                  }
             tbl.appendChild(row);
         }

}


const gameManager = {

   playerMoves: function(c, p, w, o, i, a, d) {

         let context = c;              
         let p1 = p[0];
         let p2 = p[1];
         let p1Img = i[4];
         let p2Img = i[5]
         let cellImg = i[7];
         let baseWeaponImg = i[6];
         let gunImg = i[1];
         let bowImg = i[2];
         let tridentImg = i[3];
         let weapons = w;
         let obstacles = o;

         let def1 = weapons.find(default1 => default1.url == "defaultWeapon1.png");
         let def2 = weapons.find(default2 => default2.url == "defaultWeapon2.png");
         let gun = weapons.find(typeGun => typeGun.url == "gun.png");
         let bow = weapons.find(typeBow => typeBow.url == "bow.png");
         let trident = weapons.find(typeTrident => typeTrident.url == "trident.png");

         new inputHandler(context,p1,p2,obstacles,def1,def2,gun,bow,trident,p1Img,p2Img,cellImg,baseWeaponImg,gunImg,bowImg,tridentImg);
         
   }

};

const gameBoard = {  
   
   numOccupied: 25,
   width: 98,
   height: 75,
   coordinatesX: [1, 100, 199, 298, 397, 496, 595, 694, 793, 892], //columns
   coordinatesY: [2, 74, 146, 218, 290, 362, 434, 506, 578, 650],  //rows


   removeFromArray: function(arr, elt){

      for(let i = arr.length - 1; i >= 0; i--){  
          if(arr[i] == elt){
             arr.splice(i, 1);
          }
     }

   },

   heuristic: function(a,b){

         let n1 = a.i - b.i;
         let n2 = a.j - b.j;

        let d = Math.sqrt( n1*n1 + n2*n2 );

        /*d = Math.hypot(n1, n2);*/

        return d;

   },
   
   playerSetup: function(obstacles){

         let found;
         let start;
         let end;
         let startCounter = 0;
         let endCounter = 0;
         let playerLocations = [];
         let rows = this.coordinatesX.length;
         let cols = this.coordinatesY.length;
 
         for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                 found = false;
                  for(let k = 0; k < obstacles.length; k++){
                      if(obstacles[k].x == this.coordinatesX[j] && obstacles[k].y == this.coordinatesY[i]){
                         grid[i][j] = new Cell(obstacles[k].x, obstacles[k].y, i, j);
                         grid[i][j].obstacle = true;
                         found = true;
                     }
                  }
                  if(!found){ //generate at least 10 possible starts  
                     if(startCounter <= 9 && i == 0){
                        grid[i][j] = new Cell(this.coordinatesX[j], this.coordinatesY[i], i, j);
                        grid[i][j].player = true;
                        start = grid[i][j];
                        playerLocations.push(start);
                        startCounter++;
                     }else if(endCounter <= 9 && i == 9){ //10 possible ends
                        grid[i][j] = new Cell(this.coordinatesX[j], this.coordinatesY[i], i, j);
                        grid[i][j].player = true;
                        endCounter++;
                     }else {
                       grid[i][j] = new Cell(this.coordinatesX[j], this.coordinatesY[i], i, j);
                     }
                  }
            }

         }

         for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
               grid[i][j].addNeighbours(i, j, grid);
            }
         }

                   
            return playerLocations;  

   },
 
  //f = g + h
  //g = the value of the shortest path from the start node to the current node
  //h = heuristic approximation of the node's value: the real distance between a given node and the goal node
  //f = the cost to travel all the neighbouring nodes to the goal node

   findPath: function(playerLocations, grid){
 
         let openList = [];
         let endPlayer = [];
         let end;
         let winner;
         let current;
         let neighbours = [];
         let neighbour;
         let tempG;
         let newPath;
         let i = 9;


        //populate an array with the possible cells for player two.
        for(let j = 9; j > 0; j--){
            let obj = grid[i][j];
               if(obj.player == true){
                  endPlayer.push(obj);
               }
         }

         for(let i = 0; i < playerLocations.length; i++){
             let path = [];
             path[0] = playerLocations[i];
               for(let j = 0; j < endPlayer.length; j++){
                   openList[0] = path[0]; //add player one back into the open list
                   let closedList = []; //reset closed list
                   end = endPlayer[j];
                     while(openList.length > 0) {

                           winner = 0;

                           for(let i = 0; i < openList.length; i++){  
                                if(openList[i].f < openList[winner].f){
                                      winner = i;
                                }
                           } 

                           current = openList[winner]; //lowest f score

                           if(current == end){

                              console.log("DONE!");
                              path.push(current);
                              return path;
                          }

                           this.removeFromArray(openList, current);
                           closedList.push(current);
                           //evaluate the neighbour cells before pushing to open list
                           neighbours = current.neighbours;

                           for(let i = 0; i < neighbours.length; i++){
                               neighbour = neighbours[i]; //check each neighbour
                                 if(!closedList.includes(neighbour) && !neighbour.obstacle){
                                      tempG = current.g + 1; //1 gets added to current.g as each neighbour of current is evaluated
                                       newPath = false;
                                       if(openList.includes(neighbour)){
                                          if(tempG < neighbour.g){ //that neighbour.g would have been calculated going from some other current
                                             neighbour.g = tempG;
                                             newPath = true;
                                          }
                                      }else {
                                          neighbour.g = tempG;
                                          newPath = true;
                                          openList.push(neighbour);
                                      }
                                      if(newPath){
                                          neighbour.h = this.heuristic(neighbour, end);
                                          neighbour.f = neighbour.g + neighbour.h;
                                          neighbour.previous = current;
                                      }
                                }//if(!closedList)
                           }
                     }

               }
         }

   },
               
   weaponSetup: function(grid){

         let locations = [];
         let counter = 0;
         let newWeapon;
         let weapon;
         let rows = 10;
         let cols = 10;

         for(let i = 2; i <= rows - 2; i += 3){
             newWeapon = false;
              for(let j = 2; j < cols; j++){
               if(!newWeapon){
                  if(grid[i][j].obstacle == false && grid[i][j].player == false && grid[i][j].weapon == false){
                     if(grid[i + 1][j].obstacle == false || grid[i + 1][j].player == false || grid[i + 1][j].weapon == false &&
                        grid[i - 1][j].obstacle == false || grid[i - 1][j].player == false || grid[i - 1][j].weapon == false &&
                        grid[i][j + 1].obstacle == false || grid[i][j + 1].player == false || grid[i][j + 1].weapon == false &&
                        grid[i][j - 1].obstacle == false || grid[i][j - 1].player == false || grid[i][j - 1].weapon == false){
 
                              grid[i][j] = new Cell(this.coordinatesX[j], this.coordinatesY[i], i, j);
                              grid[i][j].weapon = true;
                              weapon = grid[i][j];
                              locations.push(weapon);
                              counter++;
                              newWeapon = true;
                     }                          
                  }                                      
               }
             }
            if(counter == 3){

                return locations;
            }
         }
   },
     
   generateSprites: function(ctx, images){
 
         let pIndex = 0;
         let wIndex = 0;
            
         this.addObstacles(ctx, images);

         let startPositions = this.playerSetup(obstacles);

         let playerPositions = this.findPath(startPositions, grid);


         let p1x = playerPositions[pIndex].x;
         let p1y = playerPositions[pIndex].y;

         playerOne = new Player("playerOne.png", 98, 75, p1x, p1y);
         players.push(playerOne);

         ctx.drawImage(images[4], p1x, p1y, this.width, this.height);

         pIndex++;

         let p2x = playerPositions[pIndex].x;
         let p2y = playerPositions[pIndex].y;

         playerTwo = new Player("playerTwo.png", 98, 75, p2x, p2y);
         players.push(playerTwo);

         ctx.drawImage(images[5], p2x, p2y, this.width, this.height);

         let weaponPositions = this.weaponSetup(grid);

         let w1x = weaponPositions[wIndex].x;
         let w1y = weaponPositions[wIndex].y;

         handGun = new Weapon("gun.png", 98, 75, 15, w1x, w1y);
         handGun.gun = true;
         weapons.push(handGun);

         ctx.drawImage(images[1], w1x, w1y, this.width, this.height);

         wIndex++;

         let w2x = weaponPositions[wIndex].x;
         let w2y = weaponPositions[wIndex].y;

         longBow = new Weapon("bow.png", 98, 75, 15, w2x, w2y);
         longBow.bow = true;
         weapons.push(longBow);

         ctx.drawImage(images[2], w2x, w2y, this.width, this.height);

         wIndex++;

         let w3x = weaponPositions[wIndex].x;
         let w3y = weaponPositions[wIndex].y;

         steelTrident = new Weapon("trident.png", 98, 75, 15, w3x, w3y);
         steelTrident.trident = true;
         weapons.push(steelTrident);

         ctx.drawImage(images[3], w3x, w3y, this.width, this.height);

         defaultWeaponPlayer1 = new Weapon("defaultWeapon1.png", 98, 75, 30, p1x, p1y);
         defaultWeaponPlayer1.axe = true;
         weapons.push(defaultWeaponPlayer1);

         defaultWeaponPlayer2 = new Weapon("defaultWeapon2.png", 98, 75, 30, p2x, p2y);
         defaultWeaponPlayer2.axe = true;
         weapons.push(defaultWeaponPlayer2);


   },

   addObstacles: function(ctx, images){

         let tempArray = [];
         let locations;
         let x = 0;
         let y = 1;    
   
         for(let i = 1; i <= this.numOccupied; i++){
             locations = this.getCoords();      
               if(this.collision(locations, tempArray)){
                  i = i - 1;
                  continue;
               }
             obstacles.push(new Obstacle("tree.png", 98, 75, locations));
             ctx.drawImage(images[0], locations[x], locations[y], this.width, this.height);
         }
   },
                 
   getCoords: function(){
                                                 
         let newCoordinates = [];

         let randomX = Math.floor(Math.random() * 10);
         let randomY = Math.floor(Math.random() * 10);
         
         let x = this.coordinatesX[randomX];  
         let y = this.coordinatesY[randomY];

         newCoordinates.push(x);
         newCoordinates.push(y);  

         return newCoordinates;
                               
   },
                           
   collision: function(locations, tempArray) {

         let x = 0;
         let y = 1;
     
         if(tempArray.indexOf(locations[x]) >= 0 && tempArray.indexOf(locations[y]) >= 0) {
           for(let i = 0; i < tempArray.length; i++){
              if(tempArray[i] == locations[x] && tempArray[i + 1] == locations[y]){
                 return true;
              }
           }
           tempArray.push(locations[x]);
           tempArray.push(locations[y]);
           return false;      
        }else if(tempArray.indexOf(locations[x]) >= 0 && tempArray.indexOf(locations[y]) == -1){
            tempArray.push(locations[x]);
            tempArray.push(locations[y]);
            return false;
        }else{
            tempArray.push(locations[x]);
            tempArray.push(locations[y]);
            return false;
        }
   
   }
   
};

   
let playerOne;
let playerTwo;
let gun;
let bow;
let trident;
let defaultWeaponOne;
let defaultWeaponTwo;
let obstacles = [];
let players = [];
let weapons = [];

let grid = new Array(10);

   for(let i = 0; i < 10; i++){
      grid[i] = new Array(10);
   }  
 
           
function init(){

      let index = 0;

      let images = document.querySelectorAll("img");

      let ctx = document.querySelector("#boardCanvas").getContext("2d");

      createT(index);

      gameBoard.generateSprites(ctx, images);

      $("#attackButton").prop("disabled", true);
      $("#defendButton").prop("disabled", true);


      let reset = document.querySelector("#resetButton");

      let start = document.querySelector("#startButton");

      start.addEventListener("click", (c, p, w, o, i) => {

               c = ctx;
               p = players;
               w = weapons;
               o = obstacles;
               i = images;

              start.disabled = true;

              gameManager.playerMoves(c, p, w, o, i);
     });
           
      reset.addEventListener("click",() => {


                  document.location.reload(true);
   
     });

}

window.onload = init;    



