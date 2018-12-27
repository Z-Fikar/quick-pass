import os
from argparse import ArgumentParser


def is_file(fn):
    return os.path.isfile(fn)


def replace_to_local(fn):
    with open(fn, "r") as infile:
        data = infile.read().split("\n")

    if data:
        res = []
        for row in data:
            tmp = row.count('"/')+row.count(": /")
            qp = row.count('"/{}'.format(get_project_name())) + \
                row.count(": /{}".format(get_project_name()))
            if(tmp and not qp):
                if(row.count('"/"')+row.count(": /")):
                    row = row.replace('"/', '"/{}'.format(get_project_name()))
                    row = row.replace(
                        ': /', ': /{}'.format(get_project_name()))
                else:
                    row = row.replace('"/', '"/{}/'.format(get_project_name()))
                    row = row.replace(
                        ': /', ': /{}/'.format(get_project_name()))
            res.append(row)

    if(data != res):
        with open(fn, "w") as outfile:
            outfile.write("\n".join(res))


def replace_to_host(fn):
    with open(fn, "r") as infile:
        data = infile.read().split("\n")

    if data:
        res = []
        for row in data:
            case1 = '"/{}'.format(get_project_name())
            case2 = ": /{}".format(get_project_name())
            case11 = case1+"/"
            case22 = case2+"/"
            qp = row.count(case1) + row.count(case2)
            qp1 = row.count(case11) + row.count(case22)
            if(qp):
                if qp1:
                    row = row.replace(case11, '"/')
                    row = row.replace(case22, ": /")
                else:
                    row = row.replace(case1, '"/')
                    row = row.replace(case2, ": /")
            res.append(row)

    if(data != res):
        with open(fn, "w") as outfile:
            outfile.write("\n".join(res))


def get_project_name():
    return os.path.abspath(".").split("\\")[-1]


def main(dir, toLocal):
    total = 0
    for fn in os.listdir(dir):
        if fn.endswith(".py"):
            continue
        ff = os.path.join(dir, fn)
        not_check = [".git", "assets"]
        if(is_file(ff)):
            if(toLocal):
                replace_to_local(ff)
            else:
                replace_to_host(ff)
        elif(not any(ff.endswith(x) for x in not_check)):
            main(ff, toLocal)


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-s", "--server",
                        action="store_false", dest="verbose", default=True,
                        help="change to host server format")
    args = parser.parse_args()
    main(".", args.verbose)
