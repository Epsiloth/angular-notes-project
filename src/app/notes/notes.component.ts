import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  input = '';
  search = '';
  idCounter = 0;
  notes = [];

  constructor() 
  { 
  	
  }

  ngOnInit(): void 
  {
    if (localStorage.getItem('notes')) {
      this.notes = JSON.parse(localStorage.getItem('notes'));
    }
    if (localStorage.getItem('counter')) {
      this.idCounter = JSON.parse(localStorage.getItem('counter'));
    }
  }

  //Computed

  completed(){
    return this.notes.filter(noto => {return noto.checked === true}).length;
  }

  sortedNotes() {
    if(this.search != ''){
      console.log("searching");
      return this.notes.slice().sort(function(a, b){
        let textA = "";
        let textB = "";

        if(a.priority == 'Low'){
          textA = "c";
        }
        if(a.priority == 'Medium'){
          textA = "b";
        }
        if(a.priority == 'High'){
          textA = "a";
        }

        if(b.priority == 'Low'){
          textB = "c";
        }
        if(b.priority == 'Medium'){
          textB = "b";
        }
        if(b.priority == 'High'){
          textB = "a";
        }

          if (textA === textB) {
              return 0;
          }
          else {
              return (textA < textB) ? -1 : 1;
          }
      }).filter((noto) => {return noto.text.includes(this.search)});
    }else{
      console.log("not searching");
      return this.notes.slice().sort(function(a, b){
        let textA = "";
        let textB = "";

        if(a.priority == 'Low'){
          textA = "c";
        }
        if(a.priority == 'Medium'){
          textA = "b";
        }
        if(a.priority == 'High'){
          textA = "a";
        }

        if(b.priority == 'Low'){
          textB = "c";
        }
        if(b.priority == 'Medium'){
          textB = "b";
        }
        if(b.priority == 'High'){
          textB = "a";
        }

          if (textA === textB) {
              return 0;
          }
          else {
              return (textA < textB) ? -1 : 1;
          }
      });
    }
  }

  //Methods

  addNote(){
    if(this.input != ''){
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date +' '+ time;
      this.notes.push({id:this.idCounter, checked:false, text:this.input, priority: "Low", priorities: ["Low", "Medium", "High"], time:dateTime});  
      this.input = "";
      this.idCounter += 1;
      this.updateStorage();
    }
  }

  removeNote(){
    for(let i=this.notes.length-1; i>=0; i--){
        if(this.notes[i].checked){
            this.notes.splice(i, 1);
        }
    }
    this.updateStorage();
  }

  removeThisNote(note){
    let index = this.notes.findIndex((id) =>{
      return id.id == note.id;
    });
    this.notes.splice(index, 1);
    this.updateStorage();
  }

  updateStorage(){
    let notes = JSON.stringify(this.notes);
    let counter = JSON.stringify(this.idCounter);
    localStorage.setItem('notes', notes);
    localStorage.setItem('counter', counter);
  }
}
