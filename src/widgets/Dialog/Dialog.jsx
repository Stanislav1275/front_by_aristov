import React, {ReactElement, useEffect, useMemo, useState} from "react";
import {Button} from "primereact/button";
import {Dialog as PrimeReactDialog} from 'primereact/dialog';
import "./Dialog.scss"

const Dialog = ({ children, isLog, setIsReg}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    // const isModalOpen = useAppSelector(isOpen) as Boolean;
    // const dispatch = useAppDispatch();
    const phrase = useMemo(() => {
        return isLog? <i className='pi pi-user'></i>:"Войти"
    }, [isLog])
    const mySetVisible = (action) => {
        setIsModalOpen(action)
        // dispatch(action ? open() : close())
    }

    const footerContent = (
        <div style={{"display":"flex"}} className="justify-content-center align-items-center">

            <Button  className="reg_btn loginPopupBtn m-1 active:border-0 border-0 bg-transparent text-white-alpha-50" label="Регистрация" onClick={() => {
                // mySetVisible(false)
                setIsReg(true)
            }} autoFocus/>
            <Button  className="auth_btn loginPopupBtn m-1 active:border-0 border-0 bg-transparent text-white-alpha-50" label="Войти" onClick={() => {
                // mySetVisible(false)
                setIsReg(false)
            }} autoFocus/>
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <h1  onClick={() => {
                mySetVisible(true)

            }}>{phrase}</h1>
            <PrimeReactDialog

                // @ts-ignore
                visible={isModalOpen || false}
                header={isLog?"Личный Кабинет":"Авторизация"}
                              style={{width: '50vw'}}
                              onHide={() => {
                                  // setVisible(false)
                                  mySetVisible(false)

                              }}
                              footer={isLog ? null:footerContent}>
                {children}
            </PrimeReactDialog>
        </div>
    )
}
export default Dialog