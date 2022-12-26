program AOC22Day1
    integer :: sum = 0
    integer, dimension(3) :: highestSums = [0, 0, 0]
    integer :: line
    integer :: IERR = 0
    open (unit = 1, file = "../day1.txt", blank = "ZERO", status = "old")
    do while (IERR == 0)
        line = 0
        read(1, '(i10)', iostat = IERR) line
        if (line > 0) then
            sum = sum + line
        else
            print *, "Sum", sum
            do i = 1, 3
                if (sum > highestSums(i)) then
                    if (i > 1) then
                        highestSums(i - 1) = highestSums(i)
                    end if
                    highestSums(i) = sum
                end if
            end do
            sum = 0
        end if
    end do
    close(1)
    print *, "Highest sums", highestSums
    print *, "[P1] Highest sum", highestSums(3)
    print *, "[P2] Sum of highest 3 sums", highestSums(1) + highestSums(2) + highestSums(3)
end program
