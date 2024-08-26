//trabalhando com modulos-- a separação das interfaces, não é obrigatorio, foi apenas por organização,
//é preciso associar cada parte separada ao local onde você trabalhará ela, por isso os 'import's
import { Livro } from "./books";
import { Aluguel } from "./Rental";
import { Estudante} from "./studant";

//aqui criei um array que associe um valores as propriedades definidas nas interfaces 'Livro', 'Estudante' e 'Aluguel'
const livro:Livro[]=[
    {id:1, title:"Wake",author: "lisa maccman", year:2010, available:false, quantity:2 },
    {id:2, title:"Harry Potter ea pedra filosofal",author: "J.K Rowlling", year:1997, available:true, quantity:3 },
    {id:3, title:"O simbolo perdido",author: "Dan Bronw", year:2009, available:true, quantity:1 },
    {id:4, title:"O diario de anny Frank",author: "Anny Frank", year:1947, available:true, quantity:5},
    {id:5, title:"A logica da pesquisa cientifica",author: "Karl Popper", year:1934, available:true, quantity:1 }
]
const estudante: Estudante[]=[
    {id:23, name:"jerubiscreudonio", borrowedBooks:1},
    {id:24, name:"regiscreudiliane", borrowedBooks:1},
    {id:25, name:"jurandinoswaldir", borrowedBooks:0}
]
const rentals: Aluguel[] = [ {studentId: 23, bookIds :[4], date: new Date(Date.now())},
{studentId: 24, bookIds :[1], date: new Date(Date.now())}

];
//Map--Um Map é como um quadro de avisos com etiquetas, onde cada etiqueta (chave) está associada a uma nota (valor). No nosso exemplo, usamos 
//o Map para associar IDs de livros a objetos de livros, permitindo que encontremos um livro rapidamente apenas fornecendo o ID. Isso torna
// o acesso aos livros eficiente e direto.

const Map_livros: Map<number, Livro> = new Map(livro.map( livro =>[livro.id, livro]));
//Transformandoum array de livros em um array de pares chave-valor, onde cada par é [id, livro].
const Map_estudante: Map<number, Estudante> = new Map(estudante.map(estudante =>[estudante.id, estudante]));

//===> desafio Extra (FindBookById && FindStudentById)
function findBookById(id: number): Livro| undefined{
    return Map_livros.get(id)
}
function findStudentById(id: number): Estudante| undefined{
    return Map_estudante.get(id)
}

//===> criação da função que filtra, ou seja retira do array original somente aquilo que foi pedido, no caso o potencial de aluguel
   function getAvaliableBooks():Livro[]{
    return livro.filter(livro => livro.available);}
//===> criação da funçao que mapeia o array, devolvendo apenas oque foi pedido, no caso, o titulo
   function getBookTitles():string[]{
    return livro.map(livro => livro.title)}
//===> criação de uma função que retorna Array de livros ordenado por ano de publicação, do mais recente para o mais antigo
   function sortBooksByYear(): Livro[] {
    return livro.sort((a, b) => b.year - a.year);}
// ===> função que, dado o nome de um autor, retorna o número total de livros desse autor disponíveis na biblioteca.
    function getTotalBooksByAuthor(livros: Array<Livro>, autor:string):number{
        return livros.reduce((count, book) => 
        {
            if (book.author === autor && book.available){
                return count += book.quantity;
        }
        return count;
    }, 0)
    }

//===> função que faz os alugueis

   function rentBooks(studentId:number, bookIds:number[]):string{
//primeiro verificande se o aluno existe
    const student = estudante.find(s => s.id === studentId);
    if(!student){
        return 'Aluno não encontrado'
    }
//agora verificando se o limite de livros alugados ja não excedeu
    if(student.borrowedBooks + bookIds.length > 5){
        return 'Você excedeu o numero limite de alugueis, volte apos devolver algum'}
//avaliando se o livro sequer existe
    for(const bookId of bookIds ){
    const book = livro.find(b => b.id === bookId);
    if(!book){
        return 'livro não encontrado'
    }
//avaliando a disponibilidade de aluguel do livro
    if(!book.available || book.quantity <= 0){
        return 'livro não disponivel para aluguel, tente outra hora'}
    }
//atualizando dados
    for (const bookId of bookIds ){
        const book = livro.find(b => b.id === bookId)!;
        book.quantity -=1;
        if(book.quantity === 0){
            book.available=false;
        }
        student.borrowedBooks += bookIds.length;
        rentals.push({studentId, bookIds, date: new Date()});
    }

    return 'Livros alugados com sucesso'
   }
const FindBook = findBookById(2)
const FindStudent = findStudentById(24)
const BookasByAuthor = getTotalBooksByAuthor(livro, 'Anny Frank');
const result = rentBooks(25, [5])   
const result2 = rentBooks(25, [5]) 
const BookasByYear = sortBooksByYear();
const AvaliableBooks = getAvaliableBooks();
const BookTitles = getBookTitles();

//exemplos praticos

//console.log('livros disponiveis para aluguel: ', AvaliableBooks);
//console.log('titulos: ', BookTitles);
//console.log('livros mais recentes aos mais antigos: ', BookTitles);
//console.log(result);
//console.log(result2);
console.log('__________________________________________')
console.log(rentals)
//console.log(AvaliableBooks)
//console.log(FindBook)
//console.log(FindStudent)
//console.log(BookasByAuthor);
// /\  ,,, /\ ┏━━━━━━━━━━━━━━┓
//(  ̳• · • ̳)|♡ typescript ♡| 
//       づ   ┗━━━━━━━━━━━━━━┛

