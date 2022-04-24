/**
 * 游戏角色的构造函数
 * @param {*} name 角色名 
 * @param {*} attack 攻击力
 * @param {*} defence 防御力
 * @param {*} hp 血量
 * @param {*} critRate 暴击率 
 */
function Character(name, attack, defence, hp, critRate) {
    this.name = name;
    this.attack = attack;
    this.defence = defence;
    this.hp = hp;
    this.critRate = critRate;

    //函数
    /**
     * 打印信息
     */
    this.print = function () {
        console.log(`${this.name}\t生命${this.hp}\t攻击力${this.attack}\t防御力${this.defence}\t暴击率${this.critRate}%`)
    }

    /**
     * 主动攻击,返回战斗情况
     * @param {*} ctor 攻击对象
     */
    this.hit = function (ctor) {
        var damage = this.attack - ctor.defence;
        //判断是否有暴击
        var rate = this.critRate / 100;
        var rad = Math.random();
        var isCrit = false;//是否暴击
        if (rad <= rate) {
            damage *= 2; //伤害翻倍
            isCrit = true;
        }
        //伤害至少为1
        if (damage < 1) {
            damage = 1;
        }
        ctor.hp -= damage;
        if (ctor.hp < 0) {
            ctor.hp = 0; //血量至少为0
        }
        console.log(`【${this.name}】攻击了【${ctor.name}】,【${isCrit?"效果拔群!":"效果一般"}】,造成了【${damage}】点伤害,对方当前血量为【${ctor.hp}】`);
        //对方是否死亡
        return ctor.hp === 0;
    }
}

var hero = new Character("英雄", 100, 20, 500, 30);
hero.print();
console.log("VS");
var monster = new Character("怪兽", 120, 50, 1000, 1);
monster.print();

while(true){
    if(hero.hit(monster)){
        console.log("英雄获胜");
        break;
    }
    if(monster.hit(hero)){
        console.log("怪兽获胜");
        break;
    }

}
console.log("游戏结束");