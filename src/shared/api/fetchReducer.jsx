import {ProgressSpinner} from "primereact/progressspinner";

export const fetchReducer = (process, Component, data, newItemsLoading = true) => {//
    switch (process) {
        case 'waiting':{
            return <ProgressSpinner/>
        }
        case 'loading':{
            return  newItemsLoading? <Component {...data}/>: <ProgressSpinner/>
        }
        case 'access':{
            return <Component {...data}/>
        }
        case 'error':{
            return <div>Ошибка сервера</div>
        }
    }
}