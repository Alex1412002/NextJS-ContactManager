import Root from "./Root";

const Layout = ({children}) => {
    return (  
        <div>
            <Root />
            <div className="UI">
                { children }
            </div>
            
        </div>
    );
}
 
export default Layout;