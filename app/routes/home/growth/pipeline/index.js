import DisplayData from '../../../components/displayData';
import { useContext, useEffect, useCallback } from 'react'
import {Context} from '../../data-context'
export default function Pipeline (){
    const { setInitialGrowth, growthRecords } = useContext(Context);

    // const getInitialGrowth = useCallback(setInitialGrowth, [])

    useEffect(()=>{
        setInitialGrowth("")
    }, [])

    console.log(growthRecords)
    return (
        <div>
            <DisplayData title={'Pipeline'} dept={'growth'} />
        </div>
    )
}