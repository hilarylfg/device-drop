'use client';

import{Button, DialogTitle, GithubIcon, GoogleIcon, LoginForm, RegisterForm} from '@/shared/components';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { signIn } from 'next-auth/react';
import React from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function AuthModal({ open, onClose } : Props) {
    const [type, setType] = React.useState<'login' | 'register'>('login');

    const onSwitchType = () => {
        setType(type === 'login' ? 'register' : 'login');
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="auth-modal">
                <DialogTitle className="auth-modal__title">{type === 'login' ? 'Войти в аккаунт' : 'Регистрация'}</DialogTitle>
                {type === 'login' ? <LoginForm onClose={onClose}/> : <RegisterForm onClose={onClose}/>}
                <hr />
                <div className="auth-modal__buttons-block">
                    <Button
                        onClick={() =>
                            signIn('github', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type="button"
                        className="auth-modal__buttons-block__button">
                        <GithubIcon/>
                        Войти через GitHub
                    </Button>

                    <Button
                        onClick={() =>
                            signIn('google', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type="button"
                        className="auth-modal__buttons-block__button">
                        <GoogleIcon/>
                        Войти через Google
                    </Button>
                </div>
                <p className="auth-modal__switch__button">{type === 'login' ? 'Ещё нет аккаунта?' : 'Уже есть' +
                    ' аккаунт?'}{" "}<a onClick={onSwitchType}>{type === 'login' ? 'Зарегистрироваться' : 'Войти в аккаунт'}</a></p>
            </DialogContent>
        </Dialog>
    );
}