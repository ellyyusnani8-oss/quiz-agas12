<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quiz Pendidikan Pancasila</title>

<style>
:root{
  --bg:#ffffff;
  --card:#f3f3f3;
  --text:#111;
  --accent:#dcdcdc;
}

body.dark{
  --bg:#0f0f0f;
  --card:#1a1a1a;
  --text:#f5f5f5;
  --accent:#2a2a2a;
}

body{
  margin:0;
  font-family:'Segoe UI',sans-serif;
  background:var(--bg);
  color:var(--text);
  transition:.4s ease;
  padding:40px 20px;
}

.container{
  max-width:850px;
  margin:auto;
  animation:fade .6s ease;
}

@keyframes fade{
  from{opacity:0; transform:translateY(15px)}
  to{opacity:1; transform:translateY(0)}
}

.header{text-align:center;margin-bottom:30px}
.logo{font-size:42px;animation:pulse 2s infinite}
@keyframes pulse{0%{opacity:.6}50%{opacity:1}100%{opacity:.6}}

.card{
  background:var(--card);
  padding:20px;
  margin-bottom:18px;
  border-radius:14px;
  transition:.25s ease;
}
.card:hover{transform:translateY(-4px)}

button{
  width:100%;
  padding:10px;
  margin-top:8px;
  border-radius:8px;
  border:1px solid var(--accent);
  background:transparent;
  color:var(--text);
  cursor:pointer;
  transition:.2s ease;
}
button:hover{background:var(--accent)}
.selected{background:var(--accent)}

.toggle{
  width:auto;
  padding:8px 15px;
  margin-bottom:25px;
}

.result{margin-top:8px;font-weight:bold}
.scoreBox{
  margin-top:25px;
  padding:25px;
  text-align:center;
  border-radius:14px;
  background:var(--card);
  animation:fade .5s ease;
}
</style>
</head>

<body>
<div class="container">

<div class="header">
<div class="logo">🤖</div>
<h1>Quiz Pendidikan Pancasila</h1>
<p style="color:gray">By ChatGPT and Agastya Izzan Al Ghazi</p>
</div>

<button class="toggle" onclick="toggleTheme()">Mode Hitam / Putih</button>

<div id="quiz"></div>
<button onclick="showResult()">Lihat Hasil</button>
<div id="final"></div>

</div>

<script>
const questions=[
{q:"Makna Bhineka Tunggal Ika adalah...",o:["Bersatu tanpa perbedaan","Berbeda-beda tetapi tetap satu jua","Semua harus sama","Tidak boleh berbeda agama"],a:1},
{q:"Contoh toleransi di sekolah adalah...",o:["Mengejek teman","Menghormati teman berbeda agama","Memilih teman satu suku","Tidak mau kerja kelompok"],a:1},
{q:"Sikap tidak menerima perbedaan disebut...",o:["Toleransi","Intoleransi","Solidaritas","Persatuan"],a:1},
{q:"Masa jabatan gubernur adalah...",o:["3 tahun","4 tahun","5 tahun","6 tahun"],a:2},
{q:"Tugas DPRD provinsi adalah...",o:["Menangkap penjahat","Membuat Perda","Mengadili kasus","Mengatur lalu lintas"],a:1},
{q:"Daerah otonomi khusus adalah...",o:["Jawa Tengah","Papua","Bali","Banten"],a:1},
{q:"Pulau Samosir berada di...",o:["Sumatera Utara","Riau","Aceh","Lampung"],a:0},
{q:"Makanan khas Papua dari sagu adalah...",o:["Gudeg","Papeda","Pempek","Rendang"],a:1},
{q:"Keistimewaan Aceh adalah...",o:["Pusat industri","Syariat Islam","Ibukota negara","Wisata laut"],a:1},
{q:"Gotong royong berarti...",o:["Kerja sendiri","Kerja bersama","Bermain","Bertengkar"],a:1},
{q:"Contoh cinta tanah air adalah...",o:["Merusak fasilitas","Upacara tertib","Malas belajar","Bolos"],a:1},
{q:"UUD 1945 Pasal 27 ayat 3 tentang...",o:["Pajak","Bela negara","Sekolah","Hak pilih"],a:1},
{q:"Sungai Mahakam berada di...",o:["Kaltim","Kalsel","Sumut","Sulsel"],a:0},
{q:"Papeda biasanya disajikan dengan...",o:["Ikan kuah kuning","Ayam goreng","Sate","Bakso"],a:0},
{q:"Rumah adat Minangkabau adalah...",o:["Joglo","Gadang","Honai","Limas"],a:1},
{q:"Tradisi Subak berasal dari...",o:["Bali","Papua","Aceh","Jabar"],a:0},
{q:"Tradisi Yadnya Kasada dilakukan oleh suku...",o:["Tengger","Baduy","Dayak","Asmat"],a:0},
{q:"Sikap persatuan adalah...",o:["Tawuran","Saling membantu","Ejekan","Diskriminasi"],a:1},
{q:"Batas timur Indonesia adalah...",o:["Malaysia","Thailand","Papua Nugini","India"],a:2},
{q:"Keberagaman Indonesia meliputi...",o:["Satu budaya","Satu agama","Beragam suku","Satu bahasa"],a:2},
{q:"Partisipasi pelajar dalam pembangunan adalah...",o:["Belajar rajin","Malas","Merusak","Bolos"],a:0},
{q:"Sikap intoleran adalah...",o:["Menghargai","Mengejek agama lain","Menolong","Gotong royong"],a:1},
{q:"Provinsi tempat Honai berasal adalah...",o:["Papua","Bali","Jawa","Sumatera"],a:0},
{q:"Gotong royong di sekolah contohnya...",o:["Kerja bakti","Tawuran","Bolos","Diam saja"],a:0},
{q:"Sikap dalam keberagaman adalah...",o:["Rukun","Egois","Marah","Iri"],a:0}
];

let answers=new Array(questions.length).fill(null);

function loadQuiz(){
const quiz=document.getElementById("quiz");
questions.forEach((item,i)=>{
const card=document.createElement("div");
card.className="card";
card.innerHTML=`<p><b>${i+1}. ${item.q}</b></p>`;
item.o.forEach((opt,j)=>{
const btn=document.createElement("button");
btn.innerText=opt;
btn.onclick=()=>{
answers[i]=j;
[...card.querySelectorAll("button")].forEach(b=>b.classList.remove("selected"));
btn.classList.add("selected");
};
card.appendChild(btn);
});
const result=document.createElement("div");
result.id="r"+i;
result.className="result";
card.appendChild(result);
quiz.appendChild(card);
});}

function showResult(){
let score=0;
questions.forEach((item,i)=>{
const r=document.getElementById("r"+i);
if(answers[i]===item.a){r.innerText="Benar ✅";score++;}
else{r.innerText="Salah ❌";}
});
document.getElementById("final").innerHTML=`<div class='scoreBox'><h2>Skor Kamu: ${score} / ${questions.length}</h2></div>`;
}

function toggleTheme(){document.body.classList.toggle("dark");}

loadQuiz();
</script>

</body>
</html>