import { Request, Response, NextFunction} from "express";

// documents is the data you want to paginate
export async function paginatedResults<T>(documents: T[]): Promise<(req: Request, res: Response, next: NextFunction) => Promise<void>> {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string)
    const limit = parseInt(req.query.limit as string)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results: {
      next?: { page: number, limit: number },
      previous?: { page: number, limit: number },
      results?: T[]
    } = {};

    if (endIndex < documents.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = documents.slice(startIndex, endIndex);
      res.locals.paginatedResults = results;
      // console.log("req:", req)
      // console.log("res", results)
      next()
    } catch (error) {
      res.status(500).json({ message: "paginate failed", error: error.message });
    }
  };
}

