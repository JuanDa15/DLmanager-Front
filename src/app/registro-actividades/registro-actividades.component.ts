import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-registro-actividades',
  templateUrl: './registro-actividades.component.html',
  styleUrls: ['./registro-actividades.component.scss']
})
export class RegistroActividadesComponent implements OnInit {

  constructor(private log:LogService) { }

  logList = [];

  ngOnInit(): void {
    this.getLog();
  }

  getLog(){
    this.log.get().subscribe({
      next: value =>{
        let logs = value['data'];
        for (var i in logs) {
          logs[i]['fields']['pk'] = logs[i]['pk'];
          this.logList.push(logs[i]['fields'])
        }
      },
      error: err =>{
        Swal.fire({
          title: 'Error al obtener historial de registros',
          icon:'error',
          position:'top-right',
          timer: 2000
        })
      }
    })
  }


}
