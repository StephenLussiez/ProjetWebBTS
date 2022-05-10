function initMap() {

    var mapCase = Phaser.Math.Between(10, 60);
    var heightMap = window.innerHeight;
    var widthMap = window.innerWidth;
    var player1;    
    var directionX = true;
    var nombreCaseX = Math.round(mapCase / (heightMap > widthMap ? 6 : 3));
    var directionY = false;
    var nombreCaseY = mapCase % 2 != 0 ? Math.ceil(mapCase / (heightMap > widthMap ? 3 : 6)) : Math.round(mapCase / (heightMap > widthMap ? 3 : 6));
    var directionNX = false;
    var nombreCaseNX = Math.round(mapCase / (heightMap > widthMap ? 6 : 3));
    var directionNY = false;
    var nombreCaseNY = mapCase % 2 != 0 ? Math.ceil(mapCase / (heightMap > widthMap ? 3 : 6)) : Math.round(mapCase / (heightMap > widthMap ? 3 : 6));
    var start_cell_created = false;
    var widthCase = (widthMap*0.9)/(nombreCaseX+2);
    var heightCase = widthCase * 2;
    var map_is_event = mapCase % 2 == 0;
    var compteur = 0;
    var numéro = 0;
    var limit = 0;
    var counter = 5;
    var footer = true;
    var header = true;
    var i = 0;
    var color;
    var previousPositionX = heightMap > widthMap ? widthMap*0.5 : widthMap*0.5;
    var previousPositionY = heightMap > widthMap ? widthMap*0.5 : widthMap*0.5;
    var config = {
        type: Phaser.AUTO,
        parent : "slideMap",
        width: widthMap,
        height: heightMap,
        forceSetTimeOut: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 600 },
                debug: true
            }
        },
        scene: {
            preload: preload,
            create: create
        }
    };
    var game = new Phaser.Game(config);

    function preload() {
        this.load.image('space', 'asset/img/space.jpg');
        this.load.spritesheet('pawn', 'asset/img/pawn.png', { frameWidth: 110, frameHeight: 120 });
    }
    function create() {
        console.log(mapCase);

        this.cameras.main.setBounds(0, 0, 3000, 5000);
        this.cameras.main.setZoom(mapCase <= 25 ? widthCase >= 100 ? 0.6 : 0.7 : 0.9);


        console.log(this.cameras.main.getScroll(767, 1096));

        this.cameras.main.centerOn((previousPositionX + (((nombreCaseX+2)*widthCase)/2)), (previousPositionY + (((nombreCaseY+4)*widthCase)/2)));
        
        
        player1 = this.add.graphics().setDepth(5);
        player1.fillStyle(0x000000, 1);
        player1.lineStyle(2, 0x000000, 1);
        player1.fillRoundedRect(previousPositionX + widthCase, (previousPositionY + 20), 10, 10, 0);
        player1.strokeRoundedRect(previousPositionX + widthCase, (previousPositionY + 20), 10, 10, 0);
        rect_group = this.physics.add.group({
            immovable: true,
            allowGravity: false
        }).setDepth(4);
        
        for (i = 0; i <= mapCase; i++) {
            let widthCaseTmp = widthCase;
            let heightCaseTmp = heightCase;      
            var graph = this.add.graphics().setDepth(4);
            color = 0xc5e8c4;            
            this.physics.add.existing(graph);
            graph.lineStyle(2, 0x000000, 1);


            // UTILISER UN COMPTEUR POUR CHAQUE LIGNE !!!!!!!
            if (compteur == nombreCaseNY + 1 && directionNY || previousPositionY == limit && directionNY) {
                i = mapCase + 2;
            }
            else {
                    //case de départ
                    if (!start_cell_created) {
                        start_cell_created = true;
                        if (!map_is_event && mapCase < 15 && heightMap > widthMap) {
                            widthCaseTmp = heightCaseTmp * 2;
                            limitX = previousPositionX
                            directionX = false;
                            directionY = true;
                            compteur = 0;
                        }
                        else if (!map_is_event && mapCase >= 15 || !map_is_event && mapCase < 15) {
                            widthCaseTmp = heightCaseTmp + widthCaseTmp;
                            compteur = 0;
                        }
                        else if (map_is_event){
                            widthCaseTmp = heightCase;
                        }
                        
                        


                    }

                    //case suivante de la case départ dans le cas où on a moins de 15 cases
                    else if (compteur == 1 && mapCase < 15 && directionX && heightMap > widthMap) {
                        previousPositionX = previousPositionX + heightCaseTmp;
                        widthCaseTmp = heightCaseTmp;
                        limitX = previousPositionX
                        
                        directionX = false;
                        directionY = true;
                        compteur = 0;
                    }
                    else if (compteur == 1 && !map_is_event && mapCase == 15 && directionX && heightMap > widthMap) {
                        previousPositionX = previousPositionX + widthCaseTmp;
                        widthCaseTmp = heightCaseTmp;
                        limitX = previousPositionX
                        
                        directionX = false;
                        directionY = true;
                        compteur = 0;
                    }

                    //case suivant la case départ
                    else if (compteur == 1 && map_is_event && directionX ) {
                        previousPositionX = previousPositionX + heightCaseTmp;
                        
                    }

                    //case suivantes jusqu'à la prochaine grosse case de changement de direction X
                    else if (compteur < (nombreCaseX) - 1 && directionX) {
                        if (compteur == 1 && !map_is_event) {
                            previousPositionX = previousPositionX + widthCaseTmp*3;
                            compteur = 2;
                        }
                        else if (compteur == 1) {
                            previousPositionX = previousPositionX + widthCaseTmp;
                        }
                        else {
                            previousPositionX = previousPositionX + widthCaseTmp;
                        }
                        
                    }

                    //case de changement de direction 1
                    else if (compteur == (nombreCaseX) - 1 && directionX) {
                        previousPositionX = previousPositionX + widthCaseTmp;
                        
                        widthCaseTmp = heightCaseTmp;
                        limitX = previousPositionX
                        directionX = false;
                        directionY = true;
                        compteur = 0;
                    }

                    //case suivant le changement de direction
                    else if (compteur == 1 && directionY) {
                        if (!map_is_event && mapCase < 15 && heightMap > widthMap) {
                            previousPositionX += heightCaseTmp;
                        }
                        previousPositionY = previousPositionY + heightCaseTmp;
                        limit = previousPositionY;
                        widthCaseTmp = heightCase;
                        heightCaseTmp = widthCase;
                        
                    }

                    //case suivantes jusqu'à la prochaine grosse case de changement de direction
                    else if ((compteur <= nombreCaseY) && directionY) {
                        previousPositionY = previousPositionY + widthCaseTmp;
                        widthCaseTmp = heightCase;
                        heightCaseTmp = widthCase;
                    }

                    //case de changement de direction 2 
                    else if (compteur == (nombreCaseY + 1) && directionY) {
                        previousPositionY = previousPositionY + widthCaseTmp;
                        widthCaseTmp = heightCase;                        
                        directionNX = true;
                        directionY = false;
                        compteur = 0;
                    }

                    else if (compteur == 1 && mapCase < 15 && directionNX && heightMap > widthMap) {
                        previousPositionX = previousPositionX - heightCaseTmp;
                        widthCaseTmp = heightCaseTmp;
                        
                        directionNX = false;
                        directionNY = true;
                        compteur = 0;
                    }

                    //case suivant le changement de direction 
                    else if (compteur == 1 && directionNX) {
                        previousPositionX = previousPositionX - widthCaseTmp;
                    }

                    //case suivantes jusqu'à la prochaine grosse case de changement de direction
                    else if (compteur <= nombreCaseNX - 2 && directionNX) {
                        previousPositionX = previousPositionX - widthCaseTmp;
                    }

                    //case de changement de direction 3
                    else if (compteur == nombreCaseNX - 1 && directionNX) {
                        previousPositionX = previousPositionX - heightCaseTmp;
                        
                        widthCaseTmp = heightCaseTmp;
                        
                        directionNX = false;
                        directionNY = true;
                        compteur = 0;
                    }

                    //case suivant le changement de direction
                    else if (compteur == 1 && directionNY) {
                        previousPositionY = previousPositionY - widthCaseTmp;
                        widthCaseTmp = heightCase;
                        heightCaseTmp = widthCase;
                        

                    }

                    //case suivantes jusqu'à la prochaine grosse case de changement de direction
                    else if (compteur <= nombreCaseNY + 1 && directionNY) {

                        previousPositionY = previousPositionY - widthCaseTmp;
                        widthCaseTmp = heightCase;
                        heightCaseTmp = widthCase;
                        
                    }
                    console.log(widthCase);
                    createCase(graph, widthCaseTmp, heightCaseTmp, color, directionX, directionY, directionNX, directionNY, compteur);                    
                    graph.body.reset(previousPositionX, previousPositionY);
                    nombre = this.add.text(previousPositionX + 10, (previousPositionY + 20), numéro, { font: '24px Courier', fill: '#000000' }).setDepth(5);
                    rect_group.add(graph);
                    rect_group.add(nombre);
                    compteur = compteur + 1;
                    numéro = numéro + 1;
            }
        }

        timedEvent = this.time.addEvent({ delay: 5000, callback: update, callbackScope: this, loop: false });
        

        

    }
    function update() {
        swiper_horizontal_2.slideNext();
    }
    function createCase(graph, widthCaseTmp, heightCaseTmp, color, directionX, directionY, directionNX, directionNY, compteur){
        graph.fillStyle(color, 1);
        graph.fillRoundedRect(0, 0, widthCaseTmp, heightCaseTmp, 0);
        graph.body.setSize(widthCaseTmp, heightCaseTmp);
        graph.strokeRoundedRect(0, 0, widthCaseTmp, heightCaseTmp, 0);
        if (widthCaseTmp <= heightCaseTmp || i == 0){            
            if (header) {
                if (directionX || directionY && compteur == 0){
                    graph.strokeRoundedRect(0, 0, widthCaseTmp, heightCaseTmp*(5/6), 0);
                }
                else if (directionNX || directionNY && compteur == 0) {
                    graph.strokeRoundedRect(0, 0, widthCaseTmp, heightCaseTmp/6, 0);
                }                                
            }
            if (footer){
                if (directionX || directionY && compteur == 0){
                    graph.strokeRoundedRect(0, 0, widthCaseTmp, heightCaseTmp/6, 0);                    
                }
                else if (directionNX || directionNY && compteur == 0) {
                    graph.strokeRoundedRect(0, 0, widthCaseTmp, heightCaseTmp*(5/6), 0);
                }
            }                    
        }
        else if (widthCaseTmp > heightCaseTmp) {
            if (header) {
                if (directionY) {
                    graph.strokeRoundedRect(0, 0, widthCaseTmp/6, heightCaseTmp, 0);
                }
                else if (directionNY) {
                    graph.strokeRoundedRect(0, 0, widthCaseTmp*(5/6), heightCaseTmp, 0);
                }
                                
            }
            if (footer){                
                if (directionY) {
                    graph.strokeRoundedRect(0, 0, widthCaseTmp*(5/6), heightCaseTmp, 0);
                }
                else if (directionNY) {
                    graph.strokeRoundedRect(0, 0, widthCaseTmp/6, heightCaseTmp, 0);
                }
            }
            
            
        }

    }



}
