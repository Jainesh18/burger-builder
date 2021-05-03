export const updateObject=(oldObject,updatedPoperties)=>{
    return{
        ...oldObject,
        ...updatedPoperties,
    }
}