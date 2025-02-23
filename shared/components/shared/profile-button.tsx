import {signOut, useSession} from 'next-auth/react';
import {CircleUser, LogOut, PenLine, LogIn} from 'lucide-react';
import Link from 'next/link';
import {Button, Popover, PopoverContent, PopoverTrigger, Skeleton} from "@/shared/components";

interface Props {
    onClickSignIn?: () => void;
    className?: string;
}

export function ProfileButton({className, onClickSignIn}: Props) {
    const {data: session, status} = useSession();

    return (
        <div className={className}>
            {status === 'loading' ?
                <div className="button-block__button--skeleton">
                    <Skeleton className="button-block__button--skeleton--content__img"/>
                    <Skeleton className="button-block__button--skeleton--content"/>
                </div>

                : !session ? (
                <Button onClick={onClickSignIn} className="button-block__button">
                    <LogIn size={22}/>
                    Войти
                </Button>
            ) : (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="button-block__button">
                            <CircleUser size={22}/>
                            Профиль
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <ul className="auth-popover__list">
                            <li className="auth-popover__list__item">
                                <Link className="" href="/profile">
                                    <PenLine/> Изменить
                                </Link>
                            </li>
                            <li onClick={() => signOut({redirect: true,})} className="auth-popover__list__item">
                                <LogOut/> Выход
                            </li>
                        </ul>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
};