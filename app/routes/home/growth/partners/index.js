import DisplayData from '../../../components/displayData';
import { useContext } from 'react';
import {Context} from '../../data-context';

export default function Partners (){
    const { records, progress, page, title, dept, course } = useContext(Context);
    console.log(records)
    return (
        <div>
            <DisplayData title={'Partners'} dept={'growth'} />
        </div>
    )
}