function initGame() {
    var background;
    var height = window.innerHeight;
    var width = window.innerWidth;
    var squareSize = 400;
    var previousPosition = 0;
    var titlePosition = 165;
    var infoPosition = 150;
    var footerPosition = 130;
    var cursors;
    var resultDice = Phaser.Math.Between(1, 6);
    var advance = 0;
    var counter = 5;
    var move = false;
    var player_moved_y = 0;
    var platform_moved_x = 0;
    var player;
    var rect_group;
    var turnRight = true;
    var config = {
        type: Phaser.AUTO,
        parent : "slideAnim",
        width: width,
        height: height,
        forceSetTimeOut : true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 600 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
        }
    };
    function preload() {
        this.load.image('space', 'asset/image/space.jpg');
        this.load.spritesheet('pawn', 'asset/image/pawn.png', { frameWidth: 110, frameHeight: 120 });
    }
    function create() {
        
        text = this.add.text(10, 10, '', { font: '34px Courier', fill: '#00ff00' }).setDepth(5);
        
        this.input.addPointer(1);
        cursors = this.input.keyboard.createCursorKeys();
        rect_group = this.physics.add.group({
            immovable: true,
            allowGravity: false            
        }).setDepth(5);
        const color = new Phaser.Display.Color();
        for (var k = 0; k<2; k++){
            for (var i = 0; i<13; i++){
                color.random();
                //creation de la case Titre
                var rect = this.add.graphics().setDepth(5);
                rect.fillStyle(0x1bd5f7, 1);  
                rect.fillRoundedRect(0, 0, 400, 60, 0);
                rect.lineStyle(2, 0x000000, 1);
                rect.strokeRoundedRect(0, 0, 400, 60, 0);
                this.physics.add.existing(rect);
                rect.body.setSize(400, 60);
                rect.body.reset(previousPosition, height/3);     
                rect_group.add(rect);

                //creation de la case descriptive
                var rectInfo = this.add.graphics().setDepth(5);
                rectInfo.fillStyle(0xcbf71b, 1);  
                rectInfo.fillRoundedRect(0, 0, 400, (height/2), 0);
                rectInfo.lineStyle(2, 0x000000, 1);
                rectInfo.strokeRoundedRect(0, 0, 400, (height/2), 0);
                this.physics.add.existing(rectInfo);
                rectInfo.body.setSize(400, (height/2));
                rectInfo.body.reset(previousPosition, (height/3)+60);     
                rect_group.add(rectInfo);

                //creation de la case Footer
                var rectFooter = this.add.graphics().setDepth(5);
                rectFooter.fillStyle(0xf7421b, 1);  
                rectFooter.fillRoundedRect(0, 0, 400, 100, 0);
                rectFooter.lineStyle(2, 0x000000, 1);
                rectFooter.strokeRoundedRect(0, 0, 400, 100, 0);
                this.physics.add.existing(rectFooter);
                rectFooter.body.setSize(400, 100);
                rectFooter.body.reset(previousPosition, rectInfo.body.bottom);     
                rect_group.add(rectFooter);

                //Movement du texte dans les case
                title = this.add.text(titlePosition, (rect.body.y + 20), 'Titre', { font: '24px Courier', fill: '#000000' }).setDepth(5);
                rect_group.add(title);
                info = this.add.text(infoPosition, (rectInfo.body.y + 30), 'Description', { font: '16px Courier', fill: '#000000' }).setDepth(5);
                rect_group.add(info);
                footer = this.add.text(footerPosition, (rectFooter.body.y + 30), 'Bas de page', { font: '20px Courier', fill: '#000000' }).setDepth(5);
                rect_group.add(footer);
                
                previousPosition = previousPosition + 400;
                titlePosition = titlePosition + 400;
                infoPosition = infoPosition + 400;
                footerPosition = footerPosition + 400;
            }
        }
        //creation du background
        background = this.add.tileSprite((width/2),(height/2), width, height, 'space').setDepth(1);
        //creation du personnage/pion et de sa physics
        player = this.physics.add.sprite((squareSize/2), 100, 'pawn').setDepth(5);
        player.setBodySize(110, 120);        
        //creation des collision entre la plateforme et le personnage
        this.physics.add.collider(player, rect_group);
        
        //creation de l'evenement update qui prend la fonction update pour animer l'écran de jeu
        timedEvent = this.time.addEvent({ delay: 16, callback: update, callbackScope: this, loop: true });

        
        
    }
    function update() {
        text.setText([
            'Appuyez sur la flèche de droite ou touchez l\'écran pour avancer', 
            'résultat du dé : ' + resultDice,
        ]);
        if(player.body.touching.down){
            player_moved_y = player.y
        }
        //creation du mouvement vers l'avant
        if (cursors.right.isDown && player.body.touching.down || this.input.pointer1.isDown && player.body.touching.down) {
            moving();
        }
        if (move){
            //Gestion des rotations du personnage de manière à le faire sauter vers l'avant via une rotation d'image
            if (player.rotation >= 0.85) {
                turnRight = false;
            }
            else if (player.rotation <= -0.85) {
                turnRight = true;
            }

            if (turnRight) {
                player.rotation += 0.05;
            }
            else {
                player.rotation += -0.05;
            }

            //ajout de l'effet de saut, de collision et le décompte des cases à parcourir en fonction du résultat du dès
           if (player.body.touching.down) {
                console.log(advance);
                console.log(resultDice);
                advance++;
                if (resultDice < advance) {
                    move = false;
                    advance = 0;
                    timedCounter = this.time.addEvent({ delay: 5000, callback: counterTime, callbackScope: this, loop: false });                                        
                }
                else{
                    player.setVelocityY(-330);
                    console.log(platform_moved_x);
                    platform_moved_x = 0;
                }
                player.rotation = 0;
                
            }

            background.tilePositionX += 2;

            pos_y_diff = player_moved_y - player.y;
            pos_y_diff = (pos_y_diff > 0) ? pos_y_diff * -1 : pos_y_diff;
            platform_move_to_x = pos_y_diff * 2.2728;
            platform_moved_x += platform_move_to_x;
            rect_group.incX(platform_move_to_x);        

            player_moved_y = player.y;
        
        }
    }
    
    function counterTime(){        
        swiper_horizontal_2.slideNext(); 
    }

    function moving() {
        move=true;
    }
    var game = new Phaser.Game(config);

    
    
    
}
