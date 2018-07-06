#include <algorithm>
#include <iostream>
#include <string>

int main()
{
	int len;
	std::string word;

	std::cin >> len;
	std::cin >> word;

	for (int i = 1; i <= len; ++i)
	{
		if (!(len % i)) std::reverse(word.begin(), word.begin() + i);
		std::cout << word << std::endl;
	}

	return 0;
}