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
                        className={cn('pl-3 text-left font-normal md:w-[260px]', !value && 'text-grey-4')}>
                        {value ? format(value, 'MMM dd, yyyy') : <span>Start Date</span>}
                        <ChevronDown className='ml-auto size-4 opacity-50' />
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

const hourOptions = Array.from(
    { length: 48 },
    (_, i) => `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`
);

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
                    {hourOptions.map((option, key) => (
                        <SelectItem key={key} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormControl>
    );
};
