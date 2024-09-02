
import { Book } from "./BooksInterface";
import { Rental } from "./RentalInterface";
import { Student } from "./StudentInterface";

const books: Book[] = [
    { id: 1, title: "Wake", author: "lisa maccman", year: 2010, available: false, quantity: 2 },
    { id: 2, title: "Harry Potter ea pedra filosofal", author: "J.K Rowlling", year: 1997, available: true, quantity: 3 },
    { id: 3, title: "O simbolo perdido", author: "Dan Bronw", year: 2009, available: true, quantity: 1 },
    { id: 4, title: "O diario de anny Frank", author: "Anny Frank", year: 1947, available: true, quantity: 5 },
    { id: 5, title: "A logica da pesquisa cientifica", author: "Karl Popper", year: 1934, available: true, quantity: 1 }
]
const students: Student[] = [
    { id: 23, name: "jerubiscreudonio", borrowedBooks: 1 },
    { id: 24, name: "regiscreudiliane", borrowedBooks: 1 },
    { id: 25, name: "jurandinoswaldir", borrowedBooks: 0 }
]
const rentals: Rental[] = [{ studentId: 23, bookIds: [4], date: new Date(Date.now()) },
{ studentId: 24, bookIds: [1], date: new Date(Date.now()) }

];
//Map--Um Map é como um quadro de avisos com etiquetas, onde cada etiqueta (chave) está associada a uma nota (valor). No nosso exemplo, usamos 
//o Map para associar IDs de livros a objetos de livros, permitindo que encontremos um livro rapidamente apenas fornecendo o ID. Isso torna
// o acesso aos livros eficiente e direto.

const Map_books: Map<number, Book> = new Map(books.map(livro => [livro.id, livro]));
//Transformandoum array de livros em um array de pares chave-valor, onde cada par é [id, livro].
const Map_student: Map<number, Student> = new Map(students.map(students => [students.id, students]));

//===> desafio Extra (FindBookById && FindStudentById)
function findBookById(id: number): Book | undefined {
    return Map_books.get(id)
}
function findStudentById(id: number): Student | undefined {
    return Map_student.get(id)
}

//===> criação da função que filtra, ou seja retira do array original somente aquilo que foi pedido, no caso o potencial de aluguel
function getAvaliableBooks(): Book[] {
    return books.filter(books => books.available);
}
//===> criação da funçao que mapeia o array, devolvendo apenas oque foi pedido, no caso, o titulo
function getBookTitles(): string[] {
    return books.map(books => books.title)
}
//===> criação de uma função que retorna Array de livros ordenado por ano de publicação, do mais recente para o mais antigo
function sortBooksByYear(): Book[] {
    //TODO--ajeitar esse sort
    return books.sort((oldest, newest) => newest.year - oldest.year);
}
// ===> função que, dado o nome de um autor, retorna o número total de livros desse autor disponíveis na biblioteca.
function getTotalBooksByAuthor(books: Book[], author: string): number {
    return books.reduce((count, book) => {
        if (book.author === author && book.available) {
            return count += book.quantity;
        }
        return count;
    }, 0)
}

//===> função que faz os alugueis

function rentBooks(studentId: number, bookIds: number[]): string {
    //primeiro verificande se o aluno existe
    function validatingData(studentId: number, bookIds: number[]): string | null {
        const mesage_student_not_find = "Aluno não encontrado"
        const student = students.find(student => student.id === studentId);
        if (!student) {
            return mesage_student_not_find
        }
        //agora verificando se o limite de livros alugados ja não excedeu
        const booksLimit = 5;
        const mesage_exceeded_limit = "Você excedeu o numero limite de alugueis, volte apos devolver algum"
        if (student.borrowedBooks + bookIds.length > booksLimit) {
            return mesage_exceeded_limit
        }
        //avaliando se o livro sequer existe
        for (const bookId of bookIds) {
            const book = books.find(book => book.id === bookId);
            const mesage_book_not_find = "livro não encontrado"
            if (!book) {
                return mesage_book_not_find
            }
            //avaliando a disponibilidade de aluguel do livro
            const mesage_book_not_available = "Livro não disponivel para aluguel"
            if (!book.available || book.quantity <= 0) {
                return mesage_book_not_available
            }
        }
        return null;
    }
    //atualizando dados
    function updateData(studentId: number, bookIds: number[]): void {

        for (const bookId of bookIds) {
            const book = books.find(book => book.id === bookId)!;
            book.quantity--;
            if (book.quantity === 0) {
                book.available = false;
            }
        }
        const student = students.find(student => student.id === studentId)!;
        student.borrowedBooks += bookIds.length;
        rentals.push({ studentId, bookIds, date: new Date(Date.now()) });
    }
    const validationError = validatingData(studentId, bookIds);
    if (validationError) {
        return validationError;
    }
    updateData(studentId, bookIds)
    const mesage_sucess = "Livros alugados com sucesso"
    return mesage_sucess
}
const FindBook = findBookById(2)
const FindStudent = findStudentById(24)
const BookasByAuthor = getTotalBooksByAuthor(books, 'Anny Frank');
const result = rentBooks(25, [5])
const result2 = rentBooks(25, [5])
const BookasByYear = sortBooksByYear();
const AvaliableBooks = getAvaliableBooks();
const BookTitles = getBookTitles();

//exemplos praticos

//console.log('livros disponiveis para aluguel: ', AvaliableBooks);
//console.log('titulos: ', BookTitles);
//console.log('livros mais recentes aos mais antigos: ', BookTitles);
console.log(result);
console.log(result2);
//console.log('__________________________________________')
console.log('total de alugueis: ',rentals);
//console.log('dados do livro selecionado: ',FindBook);
//console.log('dados do(a)estudante selecionado é : ',FindStudent);
//console.log('O numero de livros do autor selecionado presentes na bibioteca é:',BookasByAuthor);
//anotações sobre clean code, primeiro erro encontrado no meu codigo é o tamanho das minhas funções
//segundo erro, mensagens como const
// /\  ,,, /\ ┏━━━━━━━━━━━━━━┓
//(  ̳• · • ̳)|♡ typescript ♡| 
//       づ   ┗━━━━━━━━━━━━━━┛

