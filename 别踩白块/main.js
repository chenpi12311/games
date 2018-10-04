function Main() {
    this.score = 0;
    this.lastScore = 0;
    this.speed = 2;
    this.color = ['#cc66cc', '#99ff66', '#66ffcc', '#FF7F24'];
    this.dom = {
        title: $('.title'),
        main: $('.main'),
        author: $('.author')
    };
    this.bindEvent();
    this.timer1 = {}; // 动态产生DIV定时器，用于产生动画
    this.timer2 = {}; // 动态检测得分，增加速度
}

Main.prototype.bindEvent = function() {
    let self = this;
    let topValue = -150;
    self.dom.title.on('click', function() {
        self.dom.title.hide();
        self.dom.author.hide();
        self.createBlock(0);
        self.timer1 = setInterval(function() {
            let main = self.dom.main;
            topValue += self.speed;
            if (main.children().length > 5) {
                // 此处判断是否漏点，若有，则游戏结束
                for (var i = 0; i < 4; i++) {
                    if (main.children().eq(5).children().eq(i).attr('class') === 'target') {
                        self.gameOver();
                    }
                }
                main.children().eq(5).remove();
            }
            if (parseInt(main.css('top')) > 0) {
                main.css('top', '-150px');
                topValue = -150;
                self.createBlock(1);
                return;
            }
            main.css({
                'top': topValue + 'px',
            });
        }, 10);

        self.timer2 = setInterval(function() {
            if ((self.score - self.lastScore) >= 10) {
                self.lastScore = self.score;
                self.speed += .5;
            }
        }, 200);
    });
};

Main.prototype.createBlock = function(io) {
    let self = this;
    let main = self.dom.main;
    let row = $('<div class="row"></div>');
    if (io === 0) {
        main.append(row);
        main.css('display', 'block');
    } else if (io === 1) {
        main.prepend(row);
    }
    for (let i = 0; i < 4; i++) {
        let column = $('<div class="col"></div>');
        row.append(column);
        column.on('click', function() {
            let $this = $(this);
            console.log($(this));
            if ($this.attr('class') === 'target') {
                $this.css('backgroundColor', '#eee').attr('class', 'col');
                self.score++;
                return
            }
            self.gameOver();
        });
    }
    let index = parseInt(Math.random() * 4);
    $(row.children()[index]).css('backgroundColor', self.color[index]);
    $(row.children()[index]).attr('class', 'target');
};

Main.prototype.gameOver = function() {
    let self = this;
    if (self.score >= 70) {
        alert("这手速，单身多少年了? 得分 " + self.score);
    } else if (self.score >= 60) {
        alert("手速可以啊！得分 " + self.score);
    } else if (self.score >= 50) {
        alert("最爱老婆大人了！真棒！得分 " + self.score);
    } else {
        alert("Game Over! 您的得分为 " + self.score);
    }
    clearInterval(self.timer1);
    clearInterval(self.timer2);
};

new Main();