function kalkulator(){
  this.kar;
  this.regAng = new RegExp("[0-9]");
  this.regOpr = new RegExp("[-+x/]");
  this.temp = [];
  this.ke = 0;
  this.panjang;
  this.max = 18;
  this.angka = ['',''];
  this.opr;

  this.input = function(kar){
    if(this.getPanjang() || kar == 'c' || kar == '<'){
      this.kar = kar;
      if(this.regAng.test(this.kar)){
        this.setAngka();
      }else if(this.regOpr.test(this.kar)){
        this.setOperator();
      }else{
        switch(this.kar){
          case "switch":
            this.setSwitch();
            break;
          case "=":
            this.getHasil();
            break;
          case ".":
            this.setKoma();
            break;
          case "<":
            this.hapus();
            break;
          case "c":
            this.bersih();
            break;
          default:
            this.error("Kesalahan",['Karakter tidak valid','Input tidak sesuai']);
        }
      }
    }else{
      this.error("Peringatan",['Kolom penuh','Gagal input'])
    }
  };

  this.setAngka = function(){
    if(this.temp[0] == '-' || this.temp[0] == 0){
      if(this.temp[0] == 0){
        if(this.temp[1] != '.' && this.ke != 0){
          this.hapus();
          this.setProp();
        }else{
          this.setProp();
        }
      }else{
        if(this.temp[1] == 0 && this.regAng.test(this.kar) && this.ke == 2){
          this.hapus();
          this.setProp();
        }else{
          this.setProp();
        }
      }
    }else{
      this.setProp();
    }
  };

  this.setSwitch = function(){
    if(this.getPanjang()){
      if((this.temp[this.ke] != "-" || this.opr != undefined)&& this.ke == 0){
        this.kar = "-";
        this.setProp();
      }else if(this.temp[this.ke - 1] == "-"){
        this.hapus();
      }else{
        this.error("Peringatan",['Tanda negatif harus diawal']);
      }
    }else{
      this.error("Peringatan",['Terlalu Panjang']);
    }
  }

  this.setKoma = function(){
    var nomor;
    var i;
    var adaKoma = false;
    for(i = 0; i < this.ke;i++){
      if(this.temp[i] == '.'){
        adaKoma = true;
      }
    }
    if(adaKoma){
      this.error("Peringatan",['Tanda koma tidak valid']);
    }else{
      if(this.ke == 0 || this.temp[this.ke - 1] == '-'){
        var formatKoma = ['0','.'];
        var i;
        for(i = 0; i < 2;i++){
          this.temp[this.ke] = formatKoma[i];
          this.ke++;
          this.setField();
        }
      }else{
        this.temp[this.ke] = '.';
        this.ke++;
        this.setField();
      }
    }
  };

  this.setOperator = function(){
    if(!this.regAng.test(this.temp[this.ke - 1])){
      this.error("Peringatan",['Format tidak valid']);
    }else{
      if(this.angka[0] == ''){
        var i;
        for(i = 0; i < this.ke;i++){
          this.angka[0] += this.temp[i];
        }
        this.setProp();
        this.ke = 0;
        this.opr = this.kar;
      }else{
        var i;
        for(i = 0; i < this.ke;i++){
          this.angka[1] += this.temp[i];
        }
        this.getHasil();
      }
    }
  };

  this.setProp = function(){
    this.temp[this.ke] = this.kar;
    this.ke++;
    this.setField();
  };

  this.setField = function(){
    if(document.getElementById("input").value += this.temp[this.ke - 1]){
      //console.log("Berhasil Input " + this.temp[this.ke - 1]);
      this.insertLog("Sukses","input " + this.temp[this.ke - 1]);
    }
  };

  this.getPanjang = function(){
    this.panjang = document.getElementById("input").value.length;
    if(this.panjang <= this.max - 1){
      return true;
    }else{
      return false;
    }
  };

  this.hapus = function(){
    var teksField = document.getElementById("input").value;
    var kar = teksField.split("");

    if(this.ke > 0){
      this.ke -= 1;
      var karTerhapus = this.temp[this.ke];
      document.getElementById('input').value = "";
      var i;
      for(i = 0; i < teksField.length - 1;i++){
        document.getElementById('input').value += kar[i];
      }
      this.temp[this.ke] = undefined;
      // console.log("Sukses menghapus " + karTerhapus);
      this.insertLog("Sukses","menghapus " + karTerhapus);
    }else if(this.ke == 0 && this.opr != undefined){
      var panjang = kar.length;
      var karTerhapus = kar[panjang - 1];
      document.getElementById('input').value = "";
      this.ke = 0;
      var i;
      for(i = 0; i < panjang - 1;i++){
        this.temp[this.ke] = kar[i];
        this.ke++;
        document.getElementById('input').value += kar[i];
      }
      this.insertLog("Sukses","menghapus " + karTerhapus);
      this.opr = undefined;
      this.angka[0] = '';
    }else{
      document.getElementById('log').innerHTML = "";
      this.error("Peringatan",['Kolom sudah bersih']);
    }
  };

  this.getHasil = function(){
    if((this.temp[0] == '-' && this.ke == 1) || this.opr == undefined && this.angka[0] == '' || this.ke == 0){
      this.error('Peringatan',['Angka belum diketahui']);
    }else{
      var sukses = false;
      var inf = false;
      if(this.angka[1] == ''){
        var i;
        for(i = 0; i < this.ke;i++){
          this.angka[1] += this.temp[i];
        }
      }
      var tmp0 = this.angka[0];
      switch (this.opr){
        case '+':
          this.angka[0] = Number(this.angka[0]) + Number(this.angka[1]);
          //console.log("Hasil : " + tmp0 + " + " + this.angka[1] + " = " + this.angka[0]);
          this.insertLog('Hasil',tmp0 + " + " + this.angka[1] + " = " + this.angka[0]);
          sukses = true;
          break;
        case '-':
          this.angka[0] = Number(this.angka[0]) - Number(this.angka[1]);
          //console.log("Hasil : " + tmp0 + " - " + this.angka[1] + " = " + this.angka[0]);
          this.insertLog('Hasil',tmp0 + " - " + this.angka[1] + " = " + this.angka[0]);
          sukses = true;
          break;
        case 'x':
          this.angka[0] = Number(this.angka[0]) * Number(this.angka[1]);
          //console.log("Hasil : " + tmp0 + " x " + this.angka[1] + " = " + this.angka[0]);
          this.insertLog('Hasil',tmp0 + " x " + this.angka[1] + " = " + this.angka[0]);
          sukses = true;
          break;
        case '/':
          this.angka[0] = Number(this.angka[0]) / Number(this.angka[1]);
          //console.log("Hasil : " + tmp0 + " / " + this.angka[1] + " = " + this.angka[0]);
          this.insertLog('Hasil',tmp0 + " / " + this.angka[1] + " = " + this.angka[0]);
          if(!this.regAng.test(this.angka[0])){
            inf = true;
          }else{
            sukses = true;
          }
        break;
      }
      if(sukses == true){
        var teksField = document.getElementById("input").value = '';
        this.ke = 0;
        this.temp = [];
        var kar = this.angka[0].toString().split("");
        for(this.ke;this.ke < kar.length;this.ke++){
          this.temp[this.ke] = kar[this.ke];
          document.getElementById("input").value += kar[this.ke];
        }
        if(this.kar == '='){
          this.opr = undefined;
          this.angka[0] = '';
          this.angka[1] = '';
        }else{
          this.angka[0] = '';
          this.angka[1] = '';
          this.setOperator();
        }
      }else{
        if(inf == true){
          this.bersih();
          this.error('Peringatan',['Hasil tidak terbatas']);
        }else{
          this.error('Kesalahan',['Gagal menghitung','Kesalahan tidak terduga']);
        }
      }
    }
  };

  this.error = function(level,teks){
    var jmlErr = teks.length;
    var i;
    for(i = 0; i < jmlErr; i++){
      //console.log(level + " : " + teks[i]);
      this.insertLog(level,teks);
    }
  };

  this.inputKeyboard = function(){
    this.error("Peringatan",['Gunakan tombol']);
    document.getElementById('input').style.animation = "inputForm 1s ease-out 1 alternate running";
    document.getElementById('input').style.color = "black";
    setTimeout(function(){
      document.getElementById('input').style.animation = "none";
      document.getElementById('input').style.color = "#00bfff";
    },1000);
  };

  this.bersih = function(){
    if(document.getElementById('input').value != ''){
      document.getElementById('input').value = '';
      //console.log('Sukses membersihkan');
      document.getElementById('log').innerHTML = "";
      this.insertLog("Sukses","membersihkan");
      this.temp = [];
      this.ke = 0;
      this.angka = ['',''];
      this.opr = undefined;
      document.getElementById('log').innerHTML = "";
    }else{
      this.error("Peringatan",['Kolom sudah bersih']);
    }
  };

  this.insertLog = function(level = '',teks){
    var field = document.getElementById('log');
    var isi = "<br>"+ field.innerHTML;
    if(level == 'Peringatan'){
      field.innerHTML = "<span class='warning'>! </span>" + teks + isi;
    }else if(level == 'Kesalahan'){
      field.innerHTML = "<span class='error'>Kesalahan : </span>" + teks + isi;
    }else if(level == 'Sukses'){
      field.innerHTML = "<span class='sukses'>Berhasil : </span>" + teks + isi;
    }else if(level == 'Hasil'){
      field.innerHTML = "<span class='total'>Hasil </span>" + teks + isi;
    }else{
      field.innerHTML = level + " " + teks + isi;
    }
  }
}
var kalk = new kalkulator();
