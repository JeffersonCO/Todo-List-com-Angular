import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  itens: any[] = []
  tarefa: any = ""
  constructor(private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.mostraDados()
  
  }

  mostraDados(){
    this.httpClient.get("http://localhost:3000/itens").subscribe({
      next: (snapshot: any) => {
        console.log(snapshot);
        this.itens = snapshot;
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }

  adicionaTarefa() {
    const model = {
      name: this.tarefa
    }
    this.httpClient.post("http://localhost:3000/itens", model).subscribe({
      next: () => {
        this.tarefa = "";
        this.mostraDados();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }
  removerTarefa(item: any) {
    console.log(item)
    this.httpClient.delete("http://localhost:3000/itens/" + item.id).subscribe({
      next: () => {
        this.mostraDados();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })

  }
  editartarefa(item: any) {
    
    item.name = window.prompt("Digite a nova tarefa")
    this.httpClient.put("http://localhost:3000/itens/" + item.id,item).subscribe({
      next: () => {
        this.mostraDados();
      },
      error: (error) => {
        alert("Deu ruim")
      }
    })
  }
}
