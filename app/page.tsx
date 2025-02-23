import {
    Button, Container, Dialog, DialogContent, DialogDescription, DialogHeader,
    DialogTitle, DialogTrigger, Filters, ProductList, TitleLengthProducts, TopBar
} from "@/shared/components";

export default function Home() {
    return (
        <>
            <Container>
                <TitleLengthProducts/>
            </Container>

            <Dialog>
                <DialogTrigger className="dialog-ui-trigger"> <Button>Open</Button> </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Авторизация</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <TopBar/>

            <Container>
                <div className="catalog-block">
                    <Filters/>
                    <ProductList/>
                </div>
            </Container>
        </>
    );
}
