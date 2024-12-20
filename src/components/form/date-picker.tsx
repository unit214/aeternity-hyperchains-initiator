import * as React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';

interface DatePickerProps {
    value: Date;
    onChange: (value: Date | undefined) => void;
}

export const DayPicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleOnSelect = (date: Date | undefined) => {
        date?.setHours(value.getHours(), value.getMinutes(), 0, 0);
        onChange(date);
        setIsPopoverOpen(false);
    };

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={'form'}
                        className={cn('w-[260px] pl-3 text-left font-normal', !value && 'text-grey-4')}>
                        {value ? format(value, 'MMM dd, yyyy') : <span>Start Date</span>}
                        <ChevronDown className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0 font-roboto' align='start'>
                <Calendar
                    mode='single'
                    selected={value}
                    onSelect={handleOnSelect}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

const hoursOptions = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30'
];
export const HoursPicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
    const handleOnSelect = (option: string) => {
        const hours = parseInt(option.split(':')[0]);
        const minutes = parseInt(option.split(':')[1]);
        value.setHours(hours, minutes, 0, 0);
        onChange(value);
    };

    return (
        <FormControl>
            <Select value={format(value, 'HH:mm')} onValueChange={handleOnSelect}>
                <SelectTrigger>
                    <SelectValue defaultValue={format(value, 'HH:mm')} placeholder='Start Time' />
                </SelectTrigger>
                <SelectContent>
                    {hoursOptions.map((option, key) => (
                        <SelectItem key={key} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormControl>
    );
};
