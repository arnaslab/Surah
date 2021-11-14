import { useDispatch, useSelector } from 'react-redux';
import {
    STATUS_IDLE,
    STATUS_FETCHING,
    STATUS_ERROR,
    STATUS_READY
} from './constants';

const statusMapper = ({status, ...rest}) => (
	!status ? rest
	: (typeof status === 'string') ?
	{
		isIdle: (status === STATUS_IDLE),
		isFetching: (status === STATUS_FETCHING),
		hasError: (status === STATUS_ERROR),
		isReady: (status === STATUS_READY),
		...rest
	}
	: (typeof status === 'object') ?
		Object.keys(status).reduce((state, key) => ({
			...state,
			['is'+key.replace(/^\w/, c => c.toUpperCase())+'Idle']: (status[key] === STATUS_IDLE),
			['is'+key.replace(/^\w/, c => c.toUpperCase())+'Fetching']: (status[key] === STATUS_FETCHING),
			['has'+key.replace(/^\w/, c => c.toUpperCase())+'Error']: (status[key] === STATUS_ERROR),
			['is'+key.replace(/^\w/, c => c.toUpperCase())+'Ready']: (status[key] === STATUS_READY),
		}), rest)
	: rest
)

export const useAppDispatch = (action) => {
    const dispatch = useDispatch();

    return (...props) => dispatch(action(...props))
}

export const useAppSelector = (selector) => {
    return useSelector((state) => statusMapper(selector(state)));
}