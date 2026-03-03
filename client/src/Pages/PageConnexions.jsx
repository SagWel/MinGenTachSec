import '../styles.css'
import FormulaireInscription from '../Components/FormulaireInscription'
// import FormulaireConnexion from '../Components/FormulaireConnexion'

const PageConnexions = () => {
    return (
        <div className="flex items-center justify-center flex-col 
        size-full text-center mt-12 gap-30">
        <h1 className='text-gray-50 text-4xl'>Sticky Pocket</h1>
            <div className='flex flex-column justify-around gap-30'>
                {/* <FormulaireConnexion /> */}
                <FormulaireInscription />
            </div>
    </div>
)
}

export default PageConnexions