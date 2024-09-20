import nivelProeficiencia from '../niveis/nivel'
import nivelProeficienciaJapones from '../niveis/nivelJapones'

class nivelFactory{
    createInstanceOfNivel(idioma){
        if(idioma == 'japones'){
            return new nivelProeficienciaJapones()
        }
        return new nivelProeficiencia()
    }
}

export default new nivelFactory()