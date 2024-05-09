import type { OrtographyResponse } from "app/interfaces/ortography.responde";
import { environment } from "environments/environment";

export const ortography = async (prompt:string) =>{
    console.log('entra a ortografi ojo')
    try {
        const resp = await fetch(`${ environment.backendAPI}/orthografhy-check`,{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({prompt})
        });
        
        if (!resp.ok) {
            throw new Error('No se pudo realizar la correccion')
        }

        const data = await resp.json() as OrtographyResponse;

        return {
            ok: true,
            ...data
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            userScore:0,
            errores:[],
            message:'No se pudo realizar la correccion'
        }
    }
}